const loading = document.getElementById("profile-loading");
const error = document.getElementById("profile-error");
const errorMessage = document.getElementById("error-message");
const profile = document.getElementById("profile");


// --------------------------------------------------
// Get profile name from URL
// --------------------------------------------------

function getProfileName() {

    const params = new URLSearchParams(window.location.search);

    const name = params.get("id");

    if (!name) {
        return null;
    }

    // Prevent people from using ../ paths
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
        return null;
    }

    return name;
}


// --------------------------------------------------
// Error handling
// --------------------------------------------------

function showError(message) {

    loading.hidden = true;
    profile.hidden = true;

    errorMessage.textContent = message;

    error.hidden = false;
}


// --------------------------------------------------
// Escape text
// --------------------------------------------------

function createText(text) {

    return document.createTextNode(
        text ?? ""
    );
}


// --------------------------------------------------
// Pronouns
// --------------------------------------------------

function renderPronouns(pronouns) {

    const container =
        document.getElementById("profile-pronouns");

    container.replaceChildren();

    if (!Array.isArray(pronouns)) {
        return;
    }

    pronouns.forEach((pronoun, index) => {

        const item = document.createElement("span");

        item.className = "pronoun";

        item.textContent = pronoun.display;

        item.setAttribute(
            "data-pronouns",
            pronoun.full
        );

        item.setAttribute(
            "aria-label",
            pronoun.full
        );

        container.appendChild(item);

        if (index < pronouns.length - 1) {

            const separator =
                document.createElement("span");

            separator.className =
                "pronoun-separator";

            separator.textContent = " · ";

            container.appendChild(separator);
        }
    });
}


// --------------------------------------------------
// Sources
// --------------------------------------------------

function renderSources(sources) {

    const section =
        document.getElementById("sources-section");

    const container =
        document.getElementById("profile-sources");

    container.replaceChildren();

    if (!Array.isArray(sources) || sources.length === 0) {
        section.hidden = true;
        return;
    }

    section.hidden = false;

    sources.forEach(source => {

        const item =
            document.createElement("div");

        item.className = "source-item";

        if (source.url) {

            const link =
                document.createElement("a");

            link.href = source.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            link.textContent = source.name;

            item.appendChild(link);

        } else {

            item.textContent = source.name;

        }

        container.appendChild(item);
    });
}


// --------------------------------------------------
// Generic tag sections
// --------------------------------------------------

function renderTags(data, field, sectionId, containerId) {

    const section =
        document.getElementById(sectionId);

    const container =
        document.getElementById(containerId);

    container.replaceChildren();

    if (!Array.isArray(data[field]) || data[field].length === 0) {

        section.hidden = true;

        return;
    }

    section.hidden = false;

    data[field].forEach(value => {

        const tag =
            document.createElement("span");

        tag.className = "tag";

        tag.textContent = value;

        container.appendChild(tag);
    });
}


// --------------------------------------------------
// Links
// --------------------------------------------------

function renderLinks(links) {

    const section =
        document.getElementById("links-section");

    const container =
        document.getElementById("profile-links");

    container.replaceChildren();

    if (!Array.isArray(links) || links.length === 0) {

        section.hidden = true;

        return;
    }

    section.hidden = false;

    links.forEach(linkData => {

        const link =
            document.createElement("a");

        link.className = "profile-link";

        link.href = linkData.url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.textContent = linkData.name;

        container.appendChild(link);
    });
}


// --------------------------------------------------
// Render profile
// --------------------------------------------------

function renderProfile(data) {

    document.title =
        `${data.name} — Profile`;

    document.getElementById(
        "profile-name"
    ).textContent = data.name;


    // Icon

    const icon =
        document.getElementById("profile-icon");

    if (data.icon) {

        icon.src = data.icon;

        icon.alt =
            `${data.name}'s icon`;

        icon.hidden = false;

    } else {

        icon.hidden = true;
    }


    // Pronouns

    renderPronouns(data.pronouns);


    // Description

    const descriptionSection =
        document.getElementById(
            "description-section"
        );

    const description =
        document.getElementById(
            "profile-description"
        );

    if (data.description) {

        description.textContent =
            data.description;

        descriptionSection.hidden = false;

    } else {

        descriptionSection.hidden = true;
    }


    // Sources

    renderSources(data.sources);


    // Other fields

    renderTags(
        data,
        "roles",
        "roles-section",
        "profile-roles"
    );

    renderTags(
        data,
        "identities",
        "identities-section",
        "profile-identities"
    );

    renderTags(
        data,
        "tags",
        "tags-section",
        "profile-tags"
    );


    // Links

    renderLinks(data.links);


    // Show page

    loading.hidden = true;

    error.hidden = true;

    profile.hidden = false;
}


// --------------------------------------------------
// Load JSON
// --------------------------------------------------

async function loadProfile() {

    const name = getProfileName();

    if (!name) {

        showError(
            "No profile was specified."
        );

        return;
    }


    try {

        const response =
            await fetch(
                `/files/${encodeURIComponent(name)}.json`,
                {
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            if (response.status === 404) {

                throw new Error(
                    `No profile named "${name}" exists.`
                );

            }

            throw new Error(
                `Unable to load profile (${response.status}).`
            );
        }


        const data =
            await response.json();


        if (!data.name) {

            throw new Error(
                "This profile is missing a name."
            );
        }


        renderProfile(data);

    } catch (err) {

        console.error(err);

        showError(err.message);
    }
}


loadProfile();
