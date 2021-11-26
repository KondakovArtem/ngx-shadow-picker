import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'input-field',
    template: `<input
        class="input shadow-picker__input"
        [ngModel]="tmp"
        (focus)="setActive(true)"
        (blur)="blur()"
        (ngModelChange)="changed($event)"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent implements OnChanges {
    @Input() value?: string;
    @Output() onChange = new EventEmitter<string>();

    public tmp?: string;
    public active = false;

    public setActive(val: boolean): void {
        this.active = val;
    }

    public changed(newValue: string): void {
        this.tmp = newValue;
        this.onChange.emit(newValue);
    }

    public blur(): void {
        this.setActive(false);
        if (/(-?\d+)((r?em)|(px)|%)$/.test(this.tmp as string)) this.onChange.emit(this.tmp);
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value && changes.value.currentValue) {
            this.tmp = changes.value.currentValue;
        }
    }
}
