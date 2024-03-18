import '/styles/style.css';
import { validateSessionAndNavigate} from './services/diaryService'

//JavaScript file tor index.html


validateSessionAndNavigate();



document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
});
