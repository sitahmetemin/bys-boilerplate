import _ from 'lodash'
import municipality_system_management from './TR/Municipality/SystemManagement';

function Municipality() {
    this.municipality = {
        ...municipality_system_management,
    };
}

let tr = _.assignIn(
    {},
    new Municipality()
);
export default tr
