document.addEventListener("DOMContentLoaded", function () {
    function updateTotals(button, type) {
        const row = button.closest('tr'); 
        const quantityInput = row.querySelector('.quantity'); 
        const price = parseFloat(quantityInput.dataset[type]); 
        const quantity = parseInt(quantityInput.value) || 0; 
        const itemTotalCell = row.querySelector('.itemTotal'); 

        const itemTotal = price * quantity;
        itemTotalCell.innerText = `₱${itemTotal}`;

        updateGrandTotal();
    }

    document.getElementById("checkoutButton").addEventListener("click", function () {
        const grandTotal = parseFloat(document.getElementById("grandTotal").textContent.replace("₱", "").replace(",", ""));
        const cashRendered = parseFloat(document.getElementById("cashInput").value);
        const change = parseFloat(document.getElementById("change").textContent.replace("₱", "").replace(",", ""));
        
        if (grandTotal === 0) {
            alert("Walang laman ang cart mo, Mæm.");
        } else if (cashRendered < grandTotal) {
            alert(`Kulang ang kwarta mo, boss!`);
        } else {
            alert(`Salamat sa pag suporta ng maliit na small business ko!
    Your total is ₱${grandTotal.toFixed(2)}. 
    Cash rendered: ₱${cashRendered.toFixed(2)}. 
    Change: ₱${change.toFixed(2)}.
    Please buy again!`);
        }
    });

    function updateGrandTotal() {
        const itemTotals = document.querySelectorAll('.itemTotal');
        let grandTotal = 0;

        itemTotals.forEach(cell => {
            const itemTotal = parseFloat(cell.innerText.replace('₱', '')) || 0;
            grandTotal += itemTotal;
        });

        document.getElementById('grandTotal').innerText = `₱${grandTotal}`;

        updateChange();
    }

    function updateChange() {
        const grandTotal = parseFloat(document.getElementById('grandTotal').innerText.replace('₱', '')) || 0;
        const cashInput = parseFloat(document.getElementById('cashInput').value) || 0;
        const change = cashInput - grandTotal;

        document.getElementById('change').innerText = `₱${change >= 0 ? change : 0}`;
    }

    document.querySelectorAll('.addBasic').forEach(button => {
        button.addEventListener('click', function () {
            updateTotals(this, 'basic');
        });
    });

    document.querySelectorAll('.addCollector').forEach(button => {
        button.addEventListener('click', function () {
            updateTotals(this, 'collector'); 
        });
    });

    document.getElementById('cashInput').addEventListener('input', updateChange);
});





