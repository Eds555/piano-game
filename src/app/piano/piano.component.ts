import { Component, HostListener } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css'],
})
export class PianoComponent {
  private pianoKeys: { [note: string]: Tone.Synth } = {};

  constructor() {
   
    ['C', 'D', 'E', 'F', 'G', 'A', 'B'].forEach((note) => {
      this.pianoKeys[note] = new Tone.Synth().toDestination();
    });
  }

  
  playNote(note: string): void {
    this.pianoKeys[note].triggerAttackRelease(note + '4', '8n');
  }

 
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const note = this.getNoteFromKey(event.key);
    if (note) {
      this.playNote(note);
    }
  }


  private getNoteFromKey(key: string): string | null {
    const keyMap: { [key: string]: string } = {
      a: 'C',
      s: 'D',
      d: 'E',
      f: 'F',
      g: 'G',
      h: 'A',
      j: 'B',
    };

    return keyMap[key.toLowerCase()] || null;
  }
}
