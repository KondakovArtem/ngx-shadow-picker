import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    SimpleChanges,
    ViewChild,
} from '@angular/core';

interface Offset {
    x: number;
    y: number;
}

@Component({
    selector: 'offset-grid',
    template: `<svg
        #svgContainer
        class="offset-grid shadow-picker__grid"
        (mousemove)="onMove($event)"
        (mousedown)="setDragging(true)"
        (mouseup)="setDragging(false)"
        [ngClass]="{ dragging: dragging }"
        data-touch="true"
        viewBox="0 0 100 100"
    >
        <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke-width="2"
            stroke-dasharray="2,1"
            stroke="currentColor"
            class="shadow-picker__grid-line"
        ></line>

        <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke-dasharray="2,1"
            stroke-width="2"
            stroke="currentColor"
            class="shadow-picker__grid-line"
        ></line>

        <line
            class="shadow-picker__grid-line"
            x1="50"
            y1="50"
            [attr.x2]="posX"
            [attr.y2]="posY"
            stroke-width="2"
            stroke="currentColor"
        ></line>
        <circle
            class="shadow-picker__grid-handle"
            [attr.cx]="posX"
            [attr.cy]="posY"
            r="5"
            fill="currentColor"
        ></circle>
    </svg>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffsetGridComponent implements OnChanges {
    @Input() offset!: Offset;
    @Input() max = 20;
    @Output() onChange = new EventEmitter<Offset>();

    public dragging = false;
    @ViewChild('svgContainer') svgRef!: ElementRef<SVGSVGElement>;

    public posX = 50;
    public posY = 50;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.offset) {
            if (changes.offset.currentValue && !this.dragging) {
                this.updatePostCoord(changes.offset.currentValue);
            }
        }
    }

    public updatePostCoord(offset: Offset = { x: 0, y: 0 }): void {
        const { x = 0, y = 0 } = offset;
        this.posX = (50 / this.max) * x + 50;
        this.posY = (50 / this.max) * y + 50;
    }

    public setDragging(value: boolean): void {
        this.dragging = value;
    }

    public onMove(e: any): void {
        if (!this.dragging || !this.svgRef.nativeElement) return;
        this.updatePos(e);
    }

    public updatePos(e: { clientX: number; clientY: number }): void {
        const point = this.svgRef.nativeElement.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const t = point.matrixTransform(this.svgRef.nativeElement.getScreenCTM()?.inverse());

        const newCoord = {
            x: Math.trunc((t.x - 50) * (this.max / 50)), // * 100) / 100,
            y: Math.trunc((t.y - 50) * (this.max / 50)), //* 100) / 100,
        };

        this.updatePostCoord(newCoord);
        this.onChange.emit(newCoord);
    }
}
