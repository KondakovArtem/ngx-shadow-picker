import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';

@Component({
    selector: 'input-field',
    template: `<ng-container *ngIf="template">
            <ng-container *ngTemplateOutlet="template; context: templateContext"></ng-container>
        </ng-container>

        <input
            *ngIf="!template"
            class="sp-input shadow-picker__input"
            [ngModel]="tmp"
            (focus)="setActive(true)"
            (blur)="blur()"
            (ngModelChange)="changed($event)"
        />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent implements OnChanges {
    @Input() value?: string;
    @Input() template?: TemplateRef<any>;
    @Output() onChange = new EventEmitter<string>();

    public tmp?: string;
    public active = false;

    public templateContext: {
        value?: string;
        onChange: {
            emit($event: string): void;
        };
    } = {
        value: '',
        onChange: {
            emit: ($event: string) => this.changed($event),
        },
    };

    public setActive(val: boolean): void {
        this.active = val;
    }

    public changed(newValue: string): void {
        this.tmp = newValue;
        this.templateContext = {
            ...this.templateContext,
            value: this.tmp,
        };
        this.onChange.emit(newValue);
    }

    public blur(): void {
        this.setActive(false);
        if (/(-?\d+)((r?em)|(px)|%)$/.test(this.tmp as string)) this.onChange.emit(this.tmp);
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value && changes.value.currentValue) {
            this.tmp = changes.value.currentValue;
            this.templateContext = {
                ...this.templateContext,
                value: this.tmp,
            };
        }
    }
}
