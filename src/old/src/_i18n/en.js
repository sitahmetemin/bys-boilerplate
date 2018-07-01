import _ from 'lodash'
import municipality_home from './EN/Municipality/home';
import municipality_menu from './EN/Municipality/tree-menu';

function Municipality() {
    this.municipality = {
        ...municipality_home,
        ...municipality_menu
    };
}

/*function Bar() {
    this.c = 3;
}

Foo.prototype.b = 2;
Bar.prototype.d = 4;*/

let en = _.assignIn(
    {},
    new Municipality()
);
export default en
