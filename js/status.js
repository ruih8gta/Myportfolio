document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('skillChart').getContext('2d');
    let myChart;
    let originalChartData;

    const initialChartConfig = {
        type: 'radar',
        data: {
            labels: ['たいりょく', 'こうきしん', 'えいごりょく', 'うん', 'しりょく'],
            datasets: [{
                label: 'ステータス',
                data: [8, 9, 7, 5, 1],
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
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    pointLabels: {
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    };

    function createChart(config) {
        if (myChart) {
            myChart.destroy();
        }
        myChart = new Chart(ctx, config);
    }

    createChart(initialChartConfig);
    originalChartData = initialChartConfig;

    document.querySelector('[data-stat="english"]').addEventListener('click', () => {
        fetch('/data/chart-data.json')
            .then(response => response.json())
            .then(data => {
                const toeicConfig = {
                    type: 'bar',
                    data: data.toeic_scores,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: 'white'
                                }
                            },
                            x: {
                                ticks: {
                                    color: 'white'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                };
                createChart(toeicConfig);
                document.getElementById('reset-chart-button').style.display = 'block';
            });
    });

    document.getElementById('reset-chart-button').addEventListener('click', () => {
        createChart(originalChartData);
        document.getElementById('reset-chart-button').style.display = 'none';
    });

    // スキルデータの定義
    const skillDetails = {
        programming: { title: 'プログラミング', description: '基本的なウェブ開発が可能です。' },
        python: { title: 'Python', description: 'データ分析、機械学習、ウェブアプリケーション開発に使用します。' },
        html_css: { title: 'HTML/CSS', description: 'ウェブページの構造とスタイルを定義します。' },
        javascript: { title: 'JavaScript', description: 'インタラクティブなウェブページを作成します。' },
        kaggle: { title: 'Kaggle', description: 'データサイエンスのコンペティションプラットフォーム。' },
        bronze: { title: 'Bronze', description: 'ブロンズメダルを目指して奮闘中。' },
        silver: { title: 'Silver', description: 'シルバーメダルはまだない。' },
        gold: { title: 'Gold', description: 'ゴールドメダルはまだない。' },
        ipa: { title: 'IPA', description: '情報処理推進機構が実施する国家試験。' },
        ap: { title: '応用情報技術者試験', description: '2017年に合格。' },
        db: { title: 'データベーススペシャリスト試験', description: '2024年に合格。' },
        pm: { title: 'プロジェクトマネージャ試験', description: '今後取得予定。' },
        certifications: { title: '民間資格', description: 'クラウドやAI関連の資格を取得。' },
        github: { title: 'GitHub Foundations/Copilot', description: '2025年に取得。' },
        ai900: { title: 'AI-900', description: '2025年に取得。' },
        gcp_ace: { title: 'GCP(ACE)', description: '今後取得予定。' },
        gcp_pmle: { title: 'GCP(PMLE)', description: '今後取得予定。' },
    };

    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('modal-skill-title');
    const modalDescription = document.getElementById('modal-skill-description');
    const closeButton = document.querySelector('.close-button');

    document.querySelectorAll('.skill-node[data-skill]').forEach(node => {
        node.addEventListener('click', (event) => {
            const skillKey = event.currentTarget.dataset.skill;
            const skillInfo = skillDetails[skillKey];

            if (skillInfo) {
                modalTitle.textContent = skillInfo.title;
                modalDescription.textContent = skillInfo.description;
                modal.style.display = 'block';
            }
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});