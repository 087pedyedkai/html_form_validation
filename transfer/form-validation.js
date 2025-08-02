document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentId = document.querySelector('input[type="text"][maxlength="10"]').value;
    const phone = document.querySelector('input[type="tel"]').value;

    // Validate student ID (10 digits)
    if (!/^\d{10}$/.test(studentId)) {
        alert('กรุณากรอกรหัสนักศึกษา 10 หลัก');
        return;
    }

    // Validate phone number (10 digits, starts with 0)
    if (!/^0\d{9}$/.test(phone)) {
        alert('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง');
        return;
    }

    // If validation passes, form can be submitted
    this.submit();
});

document.getElementById('transferForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Full name validation (at least 2 words)
    const fullName = document.getElementById('fullName').value;
    const nameWords = fullName.trim().split(/\s+/);
    if (nameWords.length < 2) {
        showError('fullName', 'กรุณากรอกชื่อและนามสกุลให้ครบถ้วน');
        isValid = false;
    }

    // Student ID validation (must be 13 digits)
    const studentId = document.getElementById('studentId').value;
    if (!/^\d{10}$/.test(studentId)) {
        showError('studentId', 'รหัสนักศึกษาต้องมี 10 หลัก');
        isValid = false;
    }

    // Phone validation (must be 10 digits starting with 0)
    const phone = document.getElementById('phone').value;
    if (!/^0\d{9}$/.test(phone)) {
        showError('phone', 'เบอร์โทรศัพท์ไม่ถูกต้อง');
        isValid = false;
    }

    // GPA validation (must be between 0.00 and 4.00)
    const gpa = parseFloat(document.getElementById('gpa').value);
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
        showError('gpa', 'เกรดเฉลี่ยต้องอยู่ระหว่าง 0.00 - 4.00');
        isValid = false;
    }

    // Credits validation based on program type
    const programType = document.getElementById('programType').value;
    const credits = parseInt(document.getElementById('credits').value);
    
    if (programType === '4ปี' && credits < 30) {
        showError('credits', 'ต้องมีหน่วยกิตสะสมไม่น้อยกว่า 30 หน่วยกิต');
        isValid = false;
    } else if (programType === 'เทียบเข้าเรียน' && credits < 18) {
        showError('credits', 'ต้องมีหน่วยกิตสะสมไม่น้อยกว่า 18 หน่วยกิต');
        isValid = false;
    }

    if (isValid) {
        showSuccessModal();
        this.reset();
    }
});

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.add('ring-2', 'ring-rose-200');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('ring-2', 'ring-rose-200');
    errorElement.classList.add('hidden');
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('div').classList.remove('opacity-0', 'scale-95');
        modal.querySelector('div').classList.add('opacity-100', 'scale-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    const modalContent = modal.querySelector('div');
    
    modalContent.classList.add('opacity-0', 'scale-95');
    modalContent.classList.remove('opacity-100', 'scale-100');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Add input event listeners for real-time validation
['fullName', 'studentId', 'phone', 'gpa', 'credits'].forEach(fieldId => {
    document.getElementById(fieldId).addEventListener('input', () => clearError(fieldId));
});
