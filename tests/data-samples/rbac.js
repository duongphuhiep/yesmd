export default {
    Kinds: [
        {
            id: "group",
            name: "Group",
            isLink: false,
        },
        {
            id: "user",
            name: "User",
            isLink: false,
        },
        {
            id: "ur",
            name: "UR",
            isLink: true,
        },
        {
            id: "role",
            name: "Role",
            isLink: false,
        },
        {
            id: "resource",
            name: "Resource",
            isLink: false,
        },
        {
            id: "right",
            name: "Right",
            isLink: false,
        },

        {
            id: "permission",
            name: "Permission",
            isLink: true,
        },
        {
            id: "privilege",
            name: "Privilege",
            isLink: true,
        },
        {
            id: "pp",
            name: "PersonalPrivilege",
            isLink: true,
        },
    ],
    Relations: [
        {
            id: "user-group",
            type: 0,
            source: "user",
            target: "group",
        },
        {
            id: "ur-user",
            type: 0,
            source: "ur",
            target: "user",
        },
        {
            id: "ur-role",
            type: 0,
            source: "ur",
            target: "role",
        },
        {
            id: "permission-resource",
            type: 0,
            source: "permission",
            target: "resource",
        },
        {
            id: "permission-right",
            type: 0,
            source: "permission",
            target: "right",
        },
        {
            id: "privilege-role",
            type: 0,
            source: "privilege",
            target: "role",
        },
        {
            id: "privilege-permission",
            type: 0,
            source: "privilege",
            target: "permission",
        },
        {
            id: "pp-user",
            type: 0,
            source: "pp",
            target: "user",
        },
        {
            id: "pp-resource",
            type: 0,
            source: "pp",
            target: "resource",
        },
        {
            id: "pp-right",
            type: 0,
            source: "pp",
            target: "right",
        },
    ],
};
