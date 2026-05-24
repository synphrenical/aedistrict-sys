function toggleExpand(event) {
    // Prevent navigation when clicking expand button
    if (event.target.closest('.tree-arrow')) {
        event.preventDefault();
    }

    const listItem = event.currentTarget.closest('.directory-item.expandable');
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
        const link = item.querySelector('.tree-line');
        if (link) {
            link.addEventListener('click', toggleExpand);
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
            const link = item.querySelector('.tree-line');
            if (link) {
                link.removeEventListener('click', toggleExpand);
                link.style.cursor = 'default';
            }
            const arrow = item.querySelector('.tree-arrow');
            if (arrow) {
                arrow.style.visibility = 'hidden';
                arrow.style.width = '0';
            }
        });
    });
});
