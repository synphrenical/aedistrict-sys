/**
 * AE DISTRICT — Auto-populate File List
 * Reads from FILE_REGISTRY and generates .frx entries dynamically
 */

function populateFileList() {
  const fileList = document.querySelector('.file-list');
  if (!fileList) return;

  // Check if already populated (avoid duplicates)
  if (fileList.dataset.populated === 'true') return;

  // Create document fragment for better performance
  const fragment = document.createDocumentFragment();

  FILE_REGISTRY.forEach(file => {
    const li = document.createElement('li');
    li.className = `file-entry ${file.pinned ? 'pinned' : ''}`;

    const a = document.createElement('a');
    a.href = file.url;
    a.className = 'file-link';

    const fileLeft = document.createElement('div');
    fileLeft.className = 'file-left';

    const pin = document.createElement('span');
    pin.className = 'file-pin';
    pin.textContent = file.pinned ? '◈' : '◇';

    const fileMeta = document.createElement('div');
    fileMeta.className = 'file-meta';

    const fileName = document.createElement('span');
    fileName.className = 'file-name';
    fileName.textContent = file.name;

    const fileSub = document.createElement('span');
    fileSub.className = 'file-sub';
    fileSub.textContent = file.path;

    const arrow = document.createElement('span');
    arrow.className = 'file-arrow';
    arrow.textContent = '→';

    // Assemble the structure
    fileMeta.appendChild(fileName);
    fileMeta.appendChild(fileSub);
    fileLeft.appendChild(pin);
    fileLeft.appendChild(fileMeta);
    a.appendChild(fileLeft);
    a.appendChild(arrow);
    li.appendChild(a);
    fragment.appendChild(li);
  });

  // Append all at once
  fileList.appendChild(fragment);
  fileList.dataset.populated = 'true';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', populateFileList);

// Also try immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', populateFileList);
} else {
  populateFileList();
}
