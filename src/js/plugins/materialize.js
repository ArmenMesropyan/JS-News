import 'materialize-css/dist/js/materialize.min';
import 'materialize-css/dist/css/materialize.min.css';

export default function generateMaterialize() {
    const selects = document.querySelectorAll('select');
    // eslint-disable-next-line no-undef
    M.FormSelect.init(selects);
}