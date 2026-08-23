const loading =
    document.getElementById("profile-loading");

const error =
    document.getElementById("profile-error");

const errorMessage =
    document.getElementById("error-message");

const profile =
    document.getElementById("profile");


/* =====================================================
   URL
   ===================================================== */

function getProfileName() {

    const path =
        window.location.pathname;

    /*
       /f/synph
    */

    const match =
        path.match(/^\/f\/([^/]+)\/?$/);

    if (match) {

        const name =
            decodeURIComponent(match[1]);

        if (
            /^[a-zA-Z0-9_-]+$/.test(name)
        ) {

            return name;

        }

    }


    /*
       /profile/?id=synph
    */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const name =
        params.get("id");


    if (
        name &&
        /^[a-zA-Z0-9_-]+$/.test(name)
    ) {

        return name;

    }


    return null;

}


/* =====================================================
   ERROR
   ===================================================== */

function showError(message) {

    loading.hidden = true;

    profile.hidden = true;

    errorMessage.textContent =
        message;

    error.hidden = false;

}


/* =====================================================
   THEME
   ===================================================== */

function applyTheme(theme = {}) {

    const root =
        document.documentElement;


    if (theme.accent) {

        root.style.setProperty(
            "--accent",
            theme.accent
        );

    }


    if (theme.background) {

        root.style.setProperty(
            "--background",
            theme.background
        );

    }


    if (theme.surface) {

        root.style.setProperty(
            "--surface",
            theme.surface
        );

    }


    if (theme.surfaceSecondary) {

        root.style.setProperty(
            "--surface-secondary",
            theme.surfaceSecondary
        );

    }


    if (theme.text) {

        root.style.setProperty(
            "--text",
            theme.text
        );

    }


    if (theme.muted) {

        root.style.setProperty(
            "--muted",
            theme.muted
        );

    }


    if (theme.border) {

        root.style.setProperty(
            "--border",
            theme.border
        );

    }


    /*
       Light / dark mode.

       This mainly changes browser-level behavior.
       Your explicit JSON colors still win.
    */

    if (theme.mode === "light") {

        root.style.colorScheme =
            "light";

    } else {

        root.style.colorScheme =
            "dark";

    }


    /*
       Background image
    */

    if (theme.backgroundImage) {

        root.style.setProperty(
            "--background-image",
            `url("${theme.backgroundImage}")`
        );

    } else {

        root.style.setProperty(
            "--background-image",
            "none"
        );

    }


    root.style.setProperty(
        "--background-position",
        theme.backgroundPosition ||
        "center"
    );


    root.style.setProperty(
        "--background-size",
        theme.backgroundSize ||
        "cover"
    );


    /*
       Background image opacity.

       We apply it by using an additional
       background layer.
    */

    if (theme.backgroundImage) {

        const layer =
            document.getElementById(
                "background-layer"
            );

        layer.style.opacity =
            theme.backgroundOpacity ??
            0.45;

    }

}


/* =====================================================
   PRONOUNS
   ===================================================== */

function renderPronouns(pronouns) {

    const container =
        document.getElementById(
            "profile-pronouns"
        );

    container.replaceChildren();


    if (
        !Array.isArray(pronouns) ||
        pronouns.length === 0
    ) {

        return;

    }


    pronouns.forEach(
        (pronoun, index) => {

            const element =
                document.createElement(
                    "span"
                );

            element.className =
                "pronoun";

            element.textContent =
                pronoun.display;

            element.dataset.pronouns =
                pronoun.full;

            element.setAttribute(
                "aria-label",
                pronoun.full
            );

            container.appendChild(
                element
            );


            if (
                index <
                pronouns.length - 1
            ) {

                const separator =
                    document.createElement(
                        "span"
                    );

                separator.textContent =
                    " · ";

                separator.style.opacity =
                    "0.5";

                container.appendChild(
                    separator
                );

            }

        }
    );

}


/* =====================================================
   TAGS
   ===================================================== */

function renderTags(
    data,
    field,
    sectionId,
    containerId
) {

    const section =
        document.getElementById(
            sectionId
        );

    const container =
        document.getElementById(
            containerId
        );


    container.replaceChildren();


    const values =
        data[field];


    if (
        !Array.isArray(values) ||
        values.length === 0
    ) {

        section.hidden = true;

        return;

    }


    section.hidden = false;


    values.forEach(value => {

        const tag =
            document.createElement(
                "span"
            );

        tag.className =
            "tag";

        tag.textContent =
            value;

        container.appendChild(
            tag
        );

    });

}


/* =====================================================
   LINKS
   ===================================================== */

function renderLinks(
    values,
    sectionId,
    containerId
) {

    const section =
        document.getElementById(
            sectionId
        );

    const container =
        document.getElementById(
            containerId
        );


    container.replaceChildren();


    if (
        !Array.isArray(values) ||
        values.length === 0
    ) {

        section.hidden = true;

        return;

    }


    section.hidden = false;


    values.forEach(item => {

        const link =
            document.createElement(
                "a"
            );

        link.className =
            "profile-link";

        link.textContent =
            item.name;

        if (item.url) {

            link.href =
                item.url;

            link.target =
                "_blank";

            link.rel =
                "noopener noreferrer";

        } else {

            link.removeAttribute(
                "href"
            );

        }


        container.appendChild(
            link
        );

    });

}


/* =====================================================
   INFORMATION
   ===================================================== */

function renderInformation(
    information
) {

    const section =
        document.getElementById(
            "information-section"
        );

    const container =
        document.getElementById(
            "profile-information"
        );


    container.replaceChildren();


    if (
        !Array.isArray(information) ||
        information.length === 0
    ) {

        section.hidden = true;

        return;

    }


    section.hidden = false;


    information.forEach(item => {

        const element =
            document.createElement(
                "div"
            );

        element.className =
            "information-item";


        const label =
            document.createElement(
                "span"
            );

        label.className =
            "information-label";

        label.textContent =
            item.label;


        const value =
            document.createElement(
                "span"
            );

        value.className =
            "information-value";

        value.textContent =
            item.value;


        element.appendChild(
            label
        );

        element.appendChild(
            value
        );


        container.appendChild(
            element
        );

    });

}


/* =====================================================
   FLAGS
   ===================================================== */

function renderFlags(flags) {

    const section =
        document.getElementById(
            "flags-section"
        );

    const container =
        document.getElementById(
            "profile-flags"
        );


    container.replaceChildren();


    if (
        !Array.isArray(flags) ||
        flags.length === 0
    ) {

        section.hidden = true;

        return;

    }


    section.hidden = false;


    flags.forEach(flag => {

        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.className =
            "flag";


        const content =
            document.createElement(
                flag.url
                    ? "a"
                    : "span"
            );


        if (flag.url) {

            content.href =
                flag.url;

            content.target =
                "_blank";

            content.rel =
                "noopener noreferrer";

        }


        if (flag.image) {

            const image =
                document.createElement(
                    "img"
                );

            image.src =
                flag.image;

            image.alt =
                flag.name;

            content.appendChild(
                image
            );

        }


        const name =
            document.createElement(
                "span"
            );

        name.textContent =
            flag.name;


        content.appendChild(
            name
        );

        wrapper.appendChild(
            content
        );

        container.appendChild(
            wrapper
        );

    });

}


/* =====================================================
   NOTES
   ===================================================== */

function renderNotes(notes) {

    const section =
        document.getElementById(
            "notes-section"
        );

    const container =
        document.getElementById(
            "profile-notes"
        );


    container.replaceChildren();


    if (
        !Array.isArray(notes) ||
        notes.length === 0
    ) {

        section.hidden = true;

        return;

    }


    section.hidden = false;


    notes.forEach(note => {

        const item =
            document.createElement(
                "li"
            );

        item.textContent =
            note;

        container.appendChild(
            item
        );

    });

}


/* =====================================================
   PROFILE
   ===================================================== */

function renderProfile(data) {

    document.title =
        `${data.name} — Profile`;


    /*
       Theme
    */

    applyTheme(
        data.theme
    );


    /*
       Name
    */

    document.getElementById(
        "profile-name"
    ).textContent =
        data.name;


    /*
       Icon
    */

    const icon =
        document.getElementById(
            "profile-icon"
        );


    if (data.icon) {

        icon.src =
            data.icon;

        icon.alt =
            `${data.name}'s icon`;

        icon.hidden = false;

    } else {

        icon.hidden = true;

    }


    /*
       Pronouns
    */

    renderPronouns(
        data.pronouns
    );


    /*
       Status
    */

    const status =
        document.getElementById(
            "profile-status"
        );


    if (data.status) {

        status.textContent =
            data.status;

        status.hidden = false;

    } else {

        status.hidden = true;

    }


    /*
       Description
    */

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

        descriptionSection.hidden =
            false;

    } else {

        descriptionSection.hidden =
            true;

    }


    /*
       Tags
    */

    renderTags(
        data,
        "identities",
        "identities-section",
        "profile-identities"
    );


    renderTags(
        data,
        "roles",
        "roles-section",
        "profile-roles"
    );


    renderTags(
        data,
        "terms",
        "terms-section",
        "profile-terms"
    );


    renderTags(
        data,
        "aliases",
        "aliases-section",
        "profile-aliases"
    );


    /*
       Information
    */

    renderInformation(
        data.information
    );


    /*
       Sources
    */

    renderLinks(
        data.sources,
        "sources-section",
        "profile-sources"
    );


    /*
       Links
    */

    renderLinks(
        data.links,
        "links-section",
        "profile-links"
    );


    /*
       Flags
    */

    renderFlags(
        data.flags
    );


    /*
       Notes
    */

    renderNotes(
        data.notes
    );


    /*
       Finished
    */

    loading.hidden = true;

    error.hidden = true;

    profile.hidden = false;

}


/* =====================================================
   LOAD
   ===================================================== */

async function loadProfile() {

    const name =
        getProfileName();


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

            if (
                response.status === 404
            ) {

                throw new Error(
                    `No profile named "${name}" exists.`
                );

            }


            throw new Error(
                `The profile could not be loaded (${response.status}).`
            );

        }


        const data =
            await response.json();


        if (!data.name) {

            throw new Error(
                "This profile is missing the required \"name\" field."
            );

        }


        renderProfile(data);


    } catch (err) {

        console.error(err);

        showError(
            err.message
        );

    }

}


loadProfile();
