import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

interface Offset {
    x: number;
    y: number;
}

@Component({
    selector: 'offset-grid',
    template: `<svg
        class="offset-grid shadow-picker__grid"
        (mouseMove)="onMove($event)"
        (mouseDown)="setDragging(true)"
        (mouseUp)="setDragging(false)"
        [ngClass]="{ dragging: dragging }"
        [attr.data-touch]="true"
        [attr.viewBox]="'0 0 100 100'"
    >
        <line
            [attr.x1]="50"
            [attr.y1]="0"
            [attr.x2]="50"
            [attr.y2]="100"
            [attr.strokeWidth]="2"
            [attr.strokeDasharray]="'2,1'"
            [attr.stroke]="currentColor"
            class="shadow-picker__grid-line"
        ></line>

        <line
            [attr.x1]="0"
            [attr.y1]="50"
            [attr.x2]="100"
            [attr.y2]="50"
            [attr.strokeDasharray]="'2,1'"
            [attr.strokeWidth]="2"
            [attr.stroke]="currentColor"
            class="shadow-picker__grid-line"
        ></line>

        <line
            [attr.x1]="50"
            [attr.y1]="50"
            [attr.x2]="posX"
            [attr.y2]="posY"
            [attr.strokeWidth]="2"
            [attr.stroke]="'currentColor'"
            class="shadow-picker__grid-line"
        ></line>
        <circle
            class="shadow-picker__grid-handle"
            [attr.cx]="posX"
            [attr.cy]="posY"
            [attr.r]="5"
            [attr.fill]="currentColor"
        ></circle>
    </svg>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffsetGridComponent {
    @Input() offset?: Offset;
    @Input() max = 20;
    @Output() onChange = new EventEmitter<Offset>();

    public dragging = false;
    public svg: any;

    // public posX = (50 / this.max) * x + 50;
    // public posY = (50 / this.max) * y + 50;

    public onMove(e: any): void {
        if (!this.dragging || !this.svg?.current) return;
        this.updatePos(e);
    }

    public updatePos(e: { clientX: number; clientY: number }): void {
        const point = this.svg.current.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const t = point.matrixTransform(this.svg.current.getScreenCTM().inverse());

        this.onChange.emit({
            x: Math.trunc((t.x - 50) * (this.max / 50) * 100) / 100,
            y: Math.trunc((t.y - 50) * (this.max / 50) * 100) / 100,
        });
    }
}
