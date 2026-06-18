document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('skillChart').getContext('2d');
    let myChart;
    let originalChartConfig;

    function createChart(config) {
        if (myChart) {
            myChart.destroy();
        }
        myChart = new Chart(ctx, config);
    }

    // ---- プロフィール（data/profile.json）の描画 ----
    function renderProfile(profile) {
        const careerHtml = (profile.career || []).join('<br>');
        document.getElementById('character-info').innerHTML = `
            <p>なまえ: ${profile.name}</p>
            <p>レベル: ${profile.level}</p>
            <p>職業: ${profile.job}</p>
            <p>経歴:<br>${careerHtml}</p>`;

        let statsHtml = `<p>HP: ${profile.hp}</p><p>MP: ${profile.mp}</p>`;
        profile.stats.forEach(stat => {
            const attr = stat.stat ? ` data-stat="${stat.stat}"` : '';
            statsHtml += `<p${attr}>${stat.label}: ${stat.value}</p>`;
        });
        document.getElementById('stats-text').innerHTML = statsHtml;
    }

    function buildRadarConfig(profile) {
        return {
            type: 'radar',
            data: {
                labels: profile.stats.map(s => s.label),
                datasets: [{
                    label: 'ステータス',
                    data: profile.stats.map(s => s.value),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.3)' },
                        grid: { color: 'rgba(255, 255, 255, 0.3)' },
                        pointLabels: { color: 'white' },
                        ticks: { color: 'white', backdropColor: 'transparent' }
                    }
                },
                plugins: {
                    legend: { labels: { color: 'white' } }
                }
            }
        };
    }

    // 英語・データ分析クリックでチャートを切り替えるハンドラを設定
    function attachStatChartHandlers() {
        const englishStat = document.querySelector('[data-stat="english"]');
        if (englishStat) {
            englishStat.addEventListener('click', () => {
                fetch('data/chart-data.json')
                    .then(response => response.json())
                    .then(data => {
                        const toeicConfig = {
                            type: 'bar',
                            data: data.toeic_scores,
                            options: {
                                scales: {
                                    y: { beginAtZero: true, ticks: { color: 'white' } },
                                    x: { ticks: { color: 'white' } }
                                },
                                plugins: { legend: { labels: { color: 'white' } } }
                            }
                        };
                        createChart(toeicConfig);
                        document.getElementById('reset-chart-button').style.display = 'block';
                    });
            });
        }

        const dataScienceStat = document.querySelector('[data-stat="data-science"]');
        if (dataScienceStat) {
            dataScienceStat.addEventListener('click', () => {
                fetch('data/chart-data.json')
                    .then(response => response.json())
                    .then(data => {
                        if (!data.kaggle_ranking) return;
                        const kaggleConfig = {
                            type: 'line',
                            data: {
                                labels: data.kaggle_ranking.labels,
                                datasets: data.kaggle_ranking.datasets
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        reverse: true, // 順位は小さいほど上位
                                        title: { display: true, text: '上位[%]', color: 'white' },
                                        ticks: { color: 'white' }
                                    },
                                    x: {
                                        title: { display: true, text: '年/月', color: 'white' },
                                        ticks: { color: 'white' }
                                    }
                                },
                                plugins: { legend: { labels: { color: 'white' } } }
                            }
                        };
                        createChart(kaggleConfig);
                        document.getElementById('reset-chart-button').style.display = 'block';
                    });
            });
        }
    }

    document.getElementById('reset-chart-button').addEventListener('click', () => {
        createChart(originalChartConfig);
        document.getElementById('reset-chart-button').style.display = 'none';
    });

    // ---- スキルツリー（data/skills.json）の描画 ----
    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('modal-skill-title');
    const modalDescription = document.getElementById('modal-skill-description');
    const closeButton = document.querySelector('.close-button');

    function createSkillNode(skill, skillDetails) {
        // モーダル表示用の詳細を収集
        skillDetails[skill.id] = {
            title: skill.title || skill.name,
            description: skill.description || ''
        };

        const node = document.createElement('div');
        node.className = 'skill-node' + (skill.learned ? ' learned' : '');
        node.dataset.skill = skill.id;
        node.appendChild(document.createTextNode(skill.name));

        if (skill.children && skill.children.length > 0) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'skill-children';
            skill.children.forEach(child => {
                childrenContainer.appendChild(createSkillNode(child, skillDetails));
            });
            node.appendChild(childrenContainer);
        }
        return node;
    }

    function renderSkillTree(skills) {
        const container = document.getElementById('skill-tree');
        container.innerHTML = '';
        const skillDetails = {};

        skills.forEach(branch => {
            const branchEl = document.createElement('div');
            branchEl.className = 'skill-branch';
            branchEl.appendChild(createSkillNode(branch, skillDetails));
            container.appendChild(branchEl);
        });

        // スキルノードのクリックでモーダル表示
        container.querySelectorAll('.skill-node[data-skill]').forEach(node => {
            node.addEventListener('click', (event) => {
                event.stopPropagation();
                const skillInfo = skillDetails[event.currentTarget.dataset.skill];
                if (skillInfo) {
                    modalTitle.textContent = skillInfo.title;
                    modalDescription.textContent = skillInfo.description;
                    modal.style.display = 'block';
                }
            });
        });
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // ---- データ読み込みと初期化 ----
    fetch('data/profile.json')
        .then(response => response.json())
        .then(profile => {
            renderProfile(profile);
            originalChartConfig = buildRadarConfig(profile);
            createChart(originalChartConfig);
            attachStatChartHandlers();
        });

    fetch('data/skills.json')
        .then(response => response.json())
        .then(skills => renderSkillTree(skills));
});
