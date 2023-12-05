import './style.css';
// import Icon from './favicon.png';
import CustomGrid from './assets/custom-elements/custom-grid.js';
import CustomCell from './assets/custom-elements/custom-cell.js';
import gridValues from './data.json';

runGridApp();

function runGridApp() {
    customElements.define('custom-grid', CustomGrid);
    customElements.define('custom-cell', CustomCell, {extends: 'a'});
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
    }

    function cellOnlyValue(val) {
        let span = document.createElement('span');
        span.innerHTML = val;
        return span;
    }

    function cellSelectBox(val) {
        var select = document.createElement('select');
        val.forEach((item) => {
            let option = document.createElement('option');
            option.value = item.value;
            option.setAttribute('tabindex', -1);
            option.innerHTML = item.title;
            select.appendChild(option);
        })
        return select;
    }

    function cellInput(val) {
        let input = document.createElement('input');
        input.setAttribute('tabindex', -1);
        input.value = val;
        return input;
    }
};
