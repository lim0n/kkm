import './style.css';
import CustomGrid from './assets/custom-elements/custom-grid.js';
import CustomCell from './assets/custom-elements/custom-cell.js';
import gridValues from './data.json';

const GRID_COLUMN_COUNT = 5;

runGridApp();

function runGridApp() {
    document.documentElement.style.setProperty('--grid-columns-count', GRID_COLUMN_COUNT);
    customElements.define('custom-cell', CustomCell);
    customElements.define('custom-grid', CustomGrid);
    const _grid = document.createElement('custom-grid');
    document.body.appendChild(_grid);
    fillGrid(_grid);

    function fillGrid(grid) {
        gridValues.forEach((item,index)=>{
            var cell = document.createElement('custom-cell');
            cell.setAttribute('tabindex', index+1);
            switch (item.type) {
                case 'value':
                    cell.appendChild(cellOnlyValue(item.value));
                    break;
                case 'input':
                    cell.appendChild(cellInput(item.value));
                    break;
                case 'selectbox':
                    cell.appendChild(cellSelectBox(item.options));
                    break;
                default:
                    break;
            }
            grid.appendChild(cell);
        });
        grid.querySelector('custom-cell').focus();
    }

    function cellOnlyValue(val) {
        let span = document.createElement('span');
        span.innerHTML = val;
        return span;
    }

    function cellSelectBox(val) {
        var select = document.createElement('select');
        select.setAttribute('tabindex', -1);
        val.forEach((item) => {
            let option = document.createElement('option');
            option.value = item.value;
            option.innerHTML = item.title;
            select.appendChild(option);
        })
        return select;
    }

    function cellInput(val) {
        let input = document.createElement('input');
        input.setAttribute('tabindex', -1);
        input.type = "text";
        input.value = val;
        return input;
    }
};
