import { skillsData, SKILL_LEVELS } from '../skills-data.js';

let currentSkillData = [...skillsData];

function createSkillNode(skill) {
    const node = document.createElement('div');
    const levelClass = `level-${skill.level}`;
    node.className = `skill-node ${levelClass}`;
    node.textContent = skill.name;

    if (skill.children && skill.children.length > 0) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'skill-children';
        skill.children.forEach(childSkill => {
            childrenContainer.appendChild(createSkillNode(childSkill));
        });
        node.appendChild(childrenContainer);
    }

    return node;
}

function renderSkillTree() {
    const container = document.getElementById('skill-tree');
    container.innerHTML = '';
    currentSkillData.forEach(skill => {
        const branch = document.createElement('div');
        branch.className = `skill-branch ${skill.category.toLowerCase().replace(' ', '-')}`;
        branch.appendChild(createSkillNode(skill));
        container.appendChild(branch);
    });
}

function populateSkillSelect() {
    const select = document.getElementById('skillSelect');
    select.innerHTML = '<option value="">スキルを選択...</option>';
    
    function addSkillOptions(skills, prefix = '') {
        skills.forEach(skill => {
            const option = document.createElement('option');
            option.value = JSON.stringify({ name: skill.name, prefix });
            option.textContent = prefix + skill.name;
            select.appendChild(option);
            
            if (skill.children) {
                addSkillOptions(skill.children, prefix + '-> ');
            }
        });
    }
    
    addSkillOptions(currentSkillData);
}

function findAndUpdateSkill(skills, targetName, learned) {
    return skills.map(skill => {
        if (skill.name === targetName) {
            return { ...skill, learned };
        }
        if (skill.children) {
            return {
                ...skill,
                children: findAndUpdateSkill(skill.children, targetName, learned)
            };
        }
        return skill;
    });
}

// イベントリスナーの設定
document.getElementById('skillSelect').addEventListener('change', (e) => {
    const selected = JSON.parse(e.target.value || '{"name":""}');
    const skill = findSkillByName(currentSkillData, selected.name);
    document.getElementById('skillLearned').checked = skill ? skill.learned : false;
});

document.getElementById('saveSkill').addEventListener('click', () => {
    const selected = JSON.parse(document.getElementById('skillSelect').value || '{"name":""}');
    const learned = document.getElementById('skillLearned').checked;
    
    if (selected.name) {
        currentSkillData = findAndUpdateSkill(currentSkillData, selected.name, learned);
        renderSkillTree();
        populateSkillSelect();
    }
});

function findSkillByName(skills, name) {
    for (const skill of skills) {
        if (skill.name === name) return skill;
        if (skill.children) {
            const found = findSkillByName(skill.children, name);
            if (found) return found;
        }
    }
    return null;
}

// スキルチャートの初期化（status.jsの内容に合わせて実装）
// ...existing chart initialization code...

// スキルツリーの描画
renderSkillTree();

document.addEventListener("DOMContentLoaded", () => {
fetch("test_header.html") // ヘッダーのHTMLを取得
        .then((response) => response.text())
        .then((data) => document.querySelector("#header-container").innerHTML = data);
});
