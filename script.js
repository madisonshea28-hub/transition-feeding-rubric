// Helpers
function getScoreByName(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? parseInt(el.value, 10) : 0;
}

function updateSection(names, sectionId, maxPoints) {
  let total = 0;
  names.forEach(name => {
    const sc = getScoreByName(name);
    total += sc;
    const cell = document.getElementById(`${name}-score`);
    if (cell) cell.textContent = sc;
  });
  const sectionEl = document.getElementById(sectionId);
  if (sectionEl) sectionEl.textContent = `Section Total: ${total} / ${maxPoints}`;
  updateOverallTotal();
}

function updateOverallTotal() {
  const mapping = window._rubricSections || [];
  let grand = 0, max = 0;
  mapping.forEach(s => {
    s.names.forEach(n => { grand += getScoreByName(n); });
    max += (s.maxPoints || 0);
  });
  let overall = document.getElementById('overall-total');
  if (!overall) {
    overall = document.createElement('p');
    overall.id = 'overall-total';
    overall.className = 'section-total';
    const container = document.getElementById('rubric-container');
    container.insertBefore(overall, container.firstChild);
  }
  overall.textContent = `Overall Total: ${grand} / ${max}`;
}

function resetSection(names, sectionId, maxPoints) {
  names.forEach(name => {
    document.querySelectorAll(`input[name="${name}"]`).forEach(r => r.checked = false);
    const cell = document.getElementById(`${name}-score`);
    if (cell) cell.textContent = '0';
  });
  const sectionEl = document.getElementById(sectionId);
  if (sectionEl) sectionEl.textContent = `Section Total: 0 / ${maxPoints}`;
  updateOverallTotal();
}

window._rubricSections = [
  { names: ['sent','word','voice'], sectionId: 'literacy-total', maxPoints: 9 },
  { names: ['feed','macro','carb','fruit','veg','safe','avoid'], sectionId: 'content-total', maxPoints: 21 },
  { names: ['lang','cult','fam','fmt'], sectionId: 'culture-total', maxPoints: 12 },
  { names: ['clar','rel','rep','lay'], sectionId: 'visual-total', maxPoints: 12 },
  { names: ['org','vis','bal','acc','txt'], sectionId: 'format-total', maxPoints: 15 }
];

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type=radio]').forEach(r => {
    r.addEventListener('change', () => {
      window._rubricSections.forEach(s => updateSection(s.names, s.sectionId, s.maxPoints));
    });
  });
  window._rubricSections.forEach(s => updateSection(s.names, s.sectionId, s.maxPoints));
});
