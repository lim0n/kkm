export default class CustomCell extends HTMLElement {
    cellIndex;
    grid;
    focused = false;
    innerInputFocused = false;
    cellsCount;
    columnsCount;
    control;

    constructor(){
        super();
    };

    connectedCallback() {
        this.control = this.querySelector('input, select');
        if (this.control) {
            this.control.disabled = true;
        }
        this.grid = this.parentNode;
        this.cellIndex = this.grid.querySelectorAll('custom-cell').length;
        this.initListeners();
    }
    
    initListeners() {
        this.addEventListener('focus', this.focusCell);
        this.addEventListener('blur', (e) => {this.blurCell(e)});
        this.addEventListener('keydown', (e) => {this.keyPressed(e)});
        this.control?.addEventListener('keydown', (e) => {this.keyPressedInput(e)});
        this.control?.addEventListener('blur', ()=> {this.blurInput()} );
    }
    
    focusCell(e) {
        this.focus({focusVisible: true});
        this.setAttribute('data-focused', true);
    }

    focusInput() {
        if (this.control) {
            this.innerInputFocused = true;
            this.control.disabled = false;
            this.control.focus();
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
        if (e.code == 'Escape' || e.code == 'Enter') {
            this.innerInputFocused = false;
            this.control.disabled = true;
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
        this.control.blur();
        this.control.disabled = true;
        this.focusCell();
    }

    moveRight() {
        const alg = (this.cellIndex + 1) % this.cellsCount
        var targetIndex = alg ? alg : this.cellsCount;
        this.blurCell();
        this.focusCellByIndex(targetIndex);
    }

    moveLeft() {
        const alg = (this.cellIndex - 1) % this.cellsCount;
        var targetIndex = alg ? alg : this.cellsCount;
        this.blurCell();
        this.focusCellByIndex(targetIndex);
    }

    moveUp() {
        let targetIndex = (this.cellIndex - this.columnsCount);
        if (targetIndex <= 0) {
            targetIndex = this.cellsCount + targetIndex -1;
            if (targetIndex == this.cellsCount - this.columnsCount) {
                targetIndex = this.cellsCount;
            }
        }
        
        this.blurCell();
        this.focusCellByIndex(targetIndex);
    }

    moveDown() {
        let targetIndex = this.cellIndex + this.columnsCount;
        if (targetIndex > this.cellsCount) {
            if (targetIndex == this.cellsCount + this.columnsCount) {
                targetIndex = 1;
            } else {
                targetIndex = targetIndex % this.cellsCount + 1;
            }
        }
        
        this.blurCell();
        this.focusCellByIndex(targetIndex);
    }

    focusCellByIndex(index) {
        this.grid.querySelector(`custom-cell:nth-of-type(${index})`).focus();
    }

    getColumnsCount() {
        return !this.columnsCount 
            ? Number(document.documentElement.style.getPropertyValue('--grid-columns-count')) 
            : this.columnsCount
    }
    
}