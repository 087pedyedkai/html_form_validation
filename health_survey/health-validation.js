// Toggle other conditions textarea
document.getElementById('otherDiseaseCheckbox').addEventListener('change', function() {
    const container = document.getElementById('otherConditionsContainer');
    const textarea = document.getElementById('otherConditions');
    
    if (this.checked) {
        container.classList.remove('hidden');
        setTimeout(() => {
            container.classList.remove('opacity-0');
        }, 10);
        textarea.required = true;
    } else {
        container.classList.add('opacity-0');
        setTimeout(() => {
            container.classList.add('hidden');
        }, 300);
        textarea.required = false;
        textarea.value = '';
    }
});

// Update BMI categories to Thai
function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return 'น้ำหนักต่ำกว่าเกณฑ์';
    } else if (bmi < 25) {
        return 'น้ำหนักปกติ';
    } else if (bmi < 30) {
        return 'น้ำหนักเกิน';
    } else {
        return 'โรคอ้วน';
    }
}

// Form submission handler
document.getElementById('healthForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseInt(document.getElementById('age').value);
    const sex = document.getElementById('sex').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    // Basic validation
    if (isNaN(age) || isNaN(height) || isNaN(weight) || !sex) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // BMI calculation
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    const category = getBMICategory(bmi);

    document.getElementById('bmiResult').textContent = `${bmi} kg/m²`;
    document.getElementById('bmiCategory').textContent = category;

    openModal(bmi, category);
});

// Modal functions
function openModal(bmi, category) {
    const modal = document.getElementById('resultModal');
    const modalContent = document.getElementById('modalContent');
    
    document.getElementById('bmiResult').textContent = bmi;
    document.getElementById('bmiCategory').textContent = category;
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('resultModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Close modal when clicking outside
document.getElementById('resultModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
