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
    ],
    Relations: [
        {
            id: "user-group",
            type: 0,
            parent: "group",
            child: "user",
        },
    ],
};
