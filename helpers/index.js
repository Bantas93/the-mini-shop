function formatedCurrency(params) {
  return Number(params).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}

module.exports = { formatedCurrency };
