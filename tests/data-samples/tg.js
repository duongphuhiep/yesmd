export default {
    Kinds: ["-Import-"],
    Relations: [
        "Supplier:Contact:4",
        "Customer:Contact:4",
        "Shipper:Contact:4",
        "OrderSupplier:Supplier",
        "OrderSupplier:Product",
        "Facture:Supplier",
        "Import:Product",
        "Import:Facture",
        "Import:Shipper:1",
        "Import:OrderSupplier:1",
        "OrderCustomer:Customer",
        "OrderCustomer:Product",
        "Export:OrderCustomer",
        "Export:Shipper:1",
    ],
};
