import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FG_URL_KEY } from "../../const/video-form-url-key.const";
import { validUrl } from "../../validators/valid-url";


export class VideoFormStub {
    private videoFormStub: FormGroup = new FormGroup({});
    private fgUrlKey = FG_URL_KEY;
    constructor() {
        this.videoFormStub = new FormGroup({
            [this.fgUrlKey]: new FormControl('', [Validators.required, validUrl()]),
            'buttonOne': new FormControl(false),
            'buttonTwo': new FormControl(false)
          });
    }

    public getVideoFormStub(): FormGroup {
        return this.videoFormStub;
    }    
}