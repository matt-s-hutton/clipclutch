import { Injectable } from '@angular/core';
import { AUDIO_FORMAT } from 'src/app/shared/const/supported_audio_formats.const';
import { VIDEO_FORMAT } from 'src/app/shared/const/supported_video_formats.const';
import { ControlOptions } from 'src/app/shared/models/control-options.type';

@Injectable({
  providedIn: 'root'
})
export class OptionButtonService {
  private defaultFormat = 'mp4';

  private embedSubsId = 'subtitles';

  private thumbnailId = 'thumbnail';

  private optionsButtons: ControlOptions[] = [
      {
          heading: 'Embed Subtitles',
          description: 'Subtitles will only be embedded if they are available for the video',
          id: this.embedSubsId,
      },
      {
          heading: 'Get thumbnail',
          description: 'A separate link to the thumbnail will be provided',
          id: this.thumbnailId,
      }
  ];


  constructor() {
    for (const audioFormat of AUDIO_FORMAT) {
      this.optionsButtons.unshift(
          {
              heading: audioFormat,
              id: audioFormat.toLowerCase(),
              default: audioFormat.toLowerCase() === this.defaultFormat
          }
      );
    }
    for (const videoFormat of VIDEO_FORMAT) {
      this.optionsButtons.unshift(
          {
              heading: videoFormat,
              id: videoFormat.toLowerCase(),
              default: videoFormat.toLowerCase() === this.defaultFormat
          }
      );
    }
  }

  public getOptionsButtons(): ControlOptions[] {
    return this.optionsButtons;
  }

  public getFormatOptionsButtons(): ControlOptions[] {
    return this.filterOptionsByHeading(VIDEO_FORMAT.concat(AUDIO_FORMAT));
  }

  public getFormatOptionsIds(): string[] {
    const optionIds: string[] = [];
    for (const option of this.getFormatOptionsButtons()) {
      optionIds.push(option.id);
    }
    return optionIds;
  }

  public getEmbedSubsId(): string {
    return this.embedSubsId;
  }

  public getThumbnailId(): string {
    return this.thumbnailId;
  }

  private filterOptionsByHeading(filterBy: string[]): ControlOptions[] {
    return this.optionsButtons.filter( (option) => {
      return filterBy.includes(option.heading);
    });
  }
}
