
import {ICellRenderer} from "./iCellRenderer";
import {Utils as _} from "../../utils";

export class AnimateSlideCellRenderer implements ICellRenderer {

    private params: any;

    private eLastCell: HTMLElement;

    public init(params: any): void {
        this.params = params;
        this.refresh(params);
    }

    public removeCell(eCell: HTMLElement): void {
        _.addCssClass(eCell, 'ag-fade-out');
        setTimeout( ()=> _.addCssClass(eCell, 'ag-fade-out-end'), 0);
        setTimeout( ()=> this.params.eParentOfValue.removeChild(eCell), 3000);
    }

    public refresh(params: any): void {

        var value = params.value;

        if (_.missing(value)) {
            value = '';
        }

        var newCell = document.createElement('span');

        if (_.exists(params.valueFormatted)) {
            newCell.innerHTML = params.valueFormatted;
        } else if (_.exists(params.value)) {
            newCell.innerHTML = value;
        } else {
            newCell.innerHTML = '';
        }
        
        if (this.eLastCell) {
            this.params.eParentOfValue.insertBefore(newCell, this.eLastCell);
            this.removeCell(this.eLastCell);
        } else {
            this.params.eParentOfValue.appendChild(newCell);
        }

        this.eLastCell = newCell;
    }

    // returning null, as we want full control
    public getGui(): HTMLElement {
        return null;
    }
}