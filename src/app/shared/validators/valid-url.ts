import { AbstractControl, ValidatorFn } from "@angular/forms";
import { SUPPORTED_SITES } from "../const/supported-sites.const";
import { UrlValidationError } from "../models/url-error.type";
import isUrlHttp from "url-http";

export function validUrl(): ValidatorFn {
    return (control: AbstractControl) => {
        const error: UrlValidationError = {
            urlError: false,
            urlErrorMessage: ''
        };

        if (control.value) {
            isUrlValid(control.value, error);
        }
        return error.urlError ? error : null;
    };
}

function isUrlValid(url: string, error: UrlValidationError): void {

    if(!isUrlHttp(url)) {
        error.urlError = true;
        error.urlErrorMessage = 'Not a valid URL';
        return;
    }

    const parts: string[] = new URL(url).hostname.split('.');
    if (!SUPPORTED_SITES.some( site => parts[parts.length -2] == site)) {
        error.urlError = true;
        error.urlErrorMessage = 'The website given in the link is not supported';
        return;
    }

    if (url.includes('playlist')) {
        error.urlError = true;
        error.urlErrorMessage = 'Playlists are not supported';
        return;
    }
}