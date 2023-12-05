export default class CustomCell extends HTMLElement {
    cellIndex;
    grid;
    focused = false;
    innerInputFocused = false;
    cellsCount;
    columnsCount;
    field;

    constructor(){
        super();
    };

    connectedCallback() {
        this.field = this.querySelector('input, select');
        if (this.field) {
            this.field.disabled = true;
        }
        this.grid = this.parentNode;
        this.cellIndex = this.grid.querySelectorAll('custom-cell').length;
        this.initListeners();
    }
    
    initListeners() {
        this.addEventListener('focus', this.focusCell);
        this.addEventListener('blur', (e) => {this.blurCell(e)});
        this.addEventListener('keydown', (e) => {this.keyPressed(e)});
        this.field?.addEventListener('keydown', (e) => {this.keyPressedInput(e)});
        this.field?.addEventListener('blur', ()=> {this.blurInput()} );
    }
    
    focusCell(e) {
        this.focus({focusVisible: true});
        this.setAttribute('data-focused', true);
    }

    focusInput() {
        if (this.field) {
            this.innerInputFocused = true;
            this.field.disabled = false;
            this.field.focus();
        }
    }

    keyPressed(e) {
        this.cellsCount = this.grid.querySelectorAll('custom-cell').length;
        this.columnsCount = this.getColumnsCount();

        if (!this.innerInputFocused) {
            switch (e.code) {
                case 'Enter':
                    this.focusInput();
                    break;
                
                case 'ArrowRight':
                    this.moveRight(e);
                    break;
    
                case 'ArrowLeft':
                    this.moveLeft(e);
                    break;
                
                case 'ArrowUp':
                    this.moveUp(e);
                    break;
                
                case 'ArrowDown':
                    this.moveDown(e);
                    break;
    
                default:
                    break;
            }
        }

    }

    keyPressedInput(e) {
        e.stopPropagation();
        console.warn('keyPressedInput', e.code);
        if (e.code == 'Escape' || e.code == 'Enter') {
            this.innerInputFocused = false;
            this.field.disabled = true;
            this.blurInput();
        }
    }

    blurCell() {
        if (!this.innerInputFocused && this.input || !this.input) {
            this.focused = false;
            this.setAttribute('data-focused', false);
        }

    }

    blurInput() {
        this.innerInputFocused = false;
        this.field.blur();
        this.field.disabled = true;
        this.focusCell();
    }

    moveRight() {
        const alg = (this.cellIndex + 1) % this.cellsCount
        var targetIndex = alg ? alg : this.cellsCount;
        this.blurCell();
        this.grid.querySelector(`custom-cell:nth-of-type(${targetIndex})`).focus();
    }

    moveLeft() {
        const alg = (this.cellIndex - 1) % this.cellsCount;
        var targetIndex = alg ? alg : this.cellsCount;
        this.blurCell();
        this.grid.querySelector(`custom-cell:nth-of-type(${targetIndex})`).focus();
    }

    moveUp() {
        let step = (this.cellIndex - this.columnsCount);
        this.blurCell();
        if (step <= 0) {
            step = this.cellsCount + step -1;
            if (step == this.cellsCount - this.columnsCount) {
                step = this.cellsCount;
            }
        }

        this.focusCellByIndex(step);
    }

    moveDown() {
        let step = this.cellIndex + this.columnsCount;
        this.blurCell();
        if (step > this.cellsCount) {
            if (step == this.cellsCount + this.columnsCount) {
                step = 1;
            } else {
                step = step % this.cellsCount + 1;
            }
        }
        
        this.focusCellByIndex(step);
    }

    focusCellByIndex(index) {
        this.grid.querySelector(`custom-cell:nth-of-type(${index})`).focus();
    }

    getColumnsCount() {
        return !this.columnsCount ? Number(document.documentElement.style.getPropertyValue('--grid-columns-count')) : this.columnsCount
    }
    
}