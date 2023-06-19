import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresnIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUJdtEXIvVgfl4leR-oF82I3OE9vwoIMM', 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(error => {
                let errorMessage = 'An unknown error occured!';
                if(!error.error || !error.error.error) {
                    return throwError(errorMessage);
                }

                switch (error.error.error.message) {
                    case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
                }
                return throwError(errorMessage);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUJdtEXIvVgfl4leR-oF82I3OE9vwoIMM', 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        );
    }
}