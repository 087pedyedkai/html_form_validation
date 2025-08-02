document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const ticketType = document.getElementById('ticketType').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    let isValid = true;

    // Name validation (at least 2 words)
    const nameWords = name.trim().split(/\s+/);
    if (nameWords.length < 2) {
        const nameError = document.getElementById('nameError');
        nameError.textContent = 'กรุณากรอกชื่อและนามสกุลให้ครบถ้วน';
        nameError.classList.remove('hidden');
        document.getElementById('name').classList.add('ring-2', 'ring-rose-200');
        isValid = false;
    } else {
        document.getElementById('nameError').classList.add('hidden');
        document.getElementById('name').classList.remove('ring-2', 'ring-rose-200');
    }

    // Phone validation (10 digits starting with 0)
    if (!/^0\d{9}$/.test(phone)) {
        const phoneError = document.getElementById('phoneError');
        phoneError.textContent = 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก ขึ้นต้นด้วย 0';
        phoneError.classList.remove('hidden');
        document.getElementById('phone').classList.add('ring-2', 'ring-rose-200');
        isValid = false;
    } else {
        document.getElementById('phoneError').classList.add('hidden');
        document.getElementById('phone').classList.remove('ring-2', 'ring-rose-200');
    }

    // Quantity validation
    const maxQuantity = (ticketType === 'vip' || ticketType === 'premium') ? 2 : 5;
    if (!ticketType) {
        document.getElementById('quantityError').textContent = 'กรุณาเลือกประเภทบัตรก่อน';
        document.getElementById('quantityError').classList.remove('hidden');
        document.getElementById('ticketType').classList.add('ring-2', 'ring-rose-200');
        isValid = false;
    } else if (quantity < 1 || quantity > maxQuantity) {
        const ticketTypes = {
            'regular': 'บัตรธรรมดา',
            'premium': 'บัตรพรีเมียม',
            'vip': 'บัตรวีไอพี'
        };
        document.getElementById('quantityError').textContent = 
            `${ticketTypes[ticketType]} สามารถจองได้ ${maxQuantity} ใบเท่านั้น`;
        document.getElementById('quantityError').classList.remove('hidden');
        document.getElementById('quantity').classList.add('ring-2', 'ring-rose-200');
        isValid = false;
    } else {
        document.getElementById('quantityError').classList.add('hidden');
        document.getElementById('quantity').classList.remove('ring-2', 'ring-rose-200');
        document.getElementById('ticketType').classList.remove('ring-2', 'ring-rose-200');
    }

    if (isValid) {
        const ticketTypes = {
            'regular': '🎫 บัตรธรรมดา',
            'premium': '✨ บัตรพรีเมียม',
            'vip': '👑 บัตรวีไอพี'
        };
        
        const modalDetails = document.getElementById('modalDetails');
        modalDetails.innerHTML = `
            <p class="mb-4 text-lg">
                <span class="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${ticketTypes[ticketType]}
                </span>
            </p>
            <p class="text-lg">จำนวน: <span class="font-semibold">${quantity} ใบ</span></p>
        `;
        
        const modal = document.getElementById('successModal');
        const modalContent = document.getElementById('modalContent');
        
        modal.classList.remove('hidden');
        setTimeout(() => {
            modalContent.classList.remove('scale-90', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
        
        this.reset();
    }
});

// Add modal close function
function closeModal() {
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.classList.add('scale-90', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Close modal when clicking outside
document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Update quantity max value when ticket type changes
document.getElementById('ticketType').addEventListener('change', function() {
    const maxQuantity = (this.value === 'vip' || this.value === 'premium') ? 2 : 5;
    const quantityInput = document.getElementById('quantity');
    quantityInput.max = maxQuantity;
    
    // Reset quantity if it exceeds new max
    if (parseInt(quantityInput.value) > maxQuantity) {
        quantityInput.value = maxQuantity;
    }
    
    // Clear error messages when ticket type changes
    document.getElementById('quantityError').classList.add('hidden');
    document.getElementById('quantity').classList.remove('ring-2', 'ring-rose-200');
    this.classList.remove('ring-2', 'ring-rose-200');
});

// Add input event listeners for real-time validation
document.getElementById('name').addEventListener('input', function() {
    const nameWords = this.value.trim().split(/\s+/);
    if (nameWords.length >= 2) {
        document.getElementById('nameError').classList.add('hidden');
        this.classList.remove('ring-2', 'ring-rose-200');
    }
});

document.getElementById('phone').addEventListener('input', function() {
    if (/^0\d{9}$/.test(this.value)) {
        document.getElementById('phoneError').classList.add('hidden');
        this.classList.remove('ring-2', 'ring-rose-200');
    }
});

document.getElementById('quantity').addEventListener('input', function() {
    const ticketType = document.getElementById('ticketType').value;
    const maxQuantity = (ticketType === 'vip' || ticketType === 'premium') ? 2 : 5;
    
    if (this.value >= 1 && this.value <= maxQuantity) {
        document.getElementById('quantityError').classList.add('hidden');
        this.classList.remove('ring-2', 'ring-rose-200');
    }
});
