function toggleExpand(event) {
    const btn = event.currentTarget;
    const listItem = btn.closest('.directory-item.expandable');
    if (!listItem) return;

    const arrow = listItem.querySelector('.tree-arrow');
    const nestedTree = listItem.querySelector('.nested-tree');

    if (!arrow || !nestedTree) return;

    arrow.classList.toggle('expanded');
    nestedTree.classList.toggle('expanded');
}

// Initialize expandable items on page load
document.addEventListener('DOMContentLoaded', function() {
    const expandableItems = document.querySelectorAll('.directory-item.expandable');
    
    expandableItems.forEach(item => {
        const btn = item.querySelector('.tree-arrow-btn');
        if (btn) {
            btn.addEventListener('click', toggleExpand);
        }
    });

    // Auto-expand sidenet items
    const sidenetContainers = document.querySelectorAll('.sidenet-container');
    sidenetContainers.forEach(container => {
        const nestedTrees = container.querySelectorAll('.nested-tree');
        nestedTrees.forEach(tree => {
            tree.classList.add('expanded');
        });

        // Disable toggle for sidenet items
        const sidenetItems = container.querySelectorAll('.directory-item.expandable');
        sidenetItems.forEach(item => {
            const btn = item.querySelector('.tree-arrow-btn');
            if (btn) {
                btn.removeEventListener('click', toggleExpand);
                btn.style.visibility = 'hidden';
                btn.style.width = '0';
            }
            const arrow = item.querySelector('.tree-arrow');
            if (arrow) {
                arrow.style.visibility = 'hidden';
                arrow.style.width = '0';
            }
        });
    });
});
