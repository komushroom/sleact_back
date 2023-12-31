import { Injectable, UnauthorizedException } from '@nestjs/common';
import {Strategy} from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {AuthService} from "./auth.service";

@Injectable()
export class LocalStrategye extends PassportStrategy(Strategy){
   constructor(private authService: AuthService){
        super({ usernameField: 'email', passwordField: 'password'});
      }
    

  async validate(email: string, password: string, done: CallableFunction) {
    const user = await this.authService.validateUser(email,password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return done(null,user);
  } 
};
  
