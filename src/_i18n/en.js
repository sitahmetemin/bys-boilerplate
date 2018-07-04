import _ from 'lodash'
import municipality_system_management from './EN/Municipality/SystemManagement';

function Municipality() {
    this.municipality = {
        ...municipality_system_management,
    };
}



let en = _.assignIn(
    {},
    new Municipality()
);


console.log('Lang', en)
export default en
