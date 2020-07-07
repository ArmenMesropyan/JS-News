/* eslint-disable no-undef */
import 'materialize-css/dist/js/materialize.min';
import 'materialize-css/dist/css/materialize.min.css';

export default function generateMaterialize() {
    const selects = document.querySelectorAll('select');
    const tabs = document.querySelectorAll('.tabs');

    M.Tabs.init(tabs);
    M.FormSelect.init(selects);
}