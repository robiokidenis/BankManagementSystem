function formatNumber(num: number) {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(0) + "k";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "m";
  } else {
    return num;
  }
}

type InvoiceStatus = "pending" | "complete" | "failed" | "canceled";

function invoiceStatus(status: InvoiceStatus): string {
  const INVOICE_CHOICES = {
    pending: "Pending",
    complete: "Success",
    failed: "Failed",
    canceled: "Canceled",
  };

  var style = `<span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">Completed</span>`;

  return INVOICE_CHOICES[status];
}

function invoiceStatusToBadge(status: InvoiceStatus): string {
  const badgeStyles = {
    pending:
      "bg-yellow-200 text-yellow-800 border-yellow-200 dark:bg-gray-700 dark:border-yellow-400 dark:text-yellow-400",
    canceled:
      "bg-red-200 text-red-800 border-red-200 dark:bg-gray-700 dark:border-red-500 dark:text-red-500",
    failed:
      "bg-red-300 text-red-800 border-red-300 dark:bg-gray-700 dark:text-red-500 dark:border-red-500",
    complete:
      "bg-green-200 text-blue-800 border-blue-200 dark:bg-gray-700 dark:text-green-500 dark:border-green-500",
  };

  const badgeLabels = {
    pending: "Pending",
    complete: "Success",
    failed: "Failed",
    canceled: "Canceled",
  };

  const badgeStyle = badgeStyles[status];
  const badgeLabel = badgeLabels[status];

  return `<span class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border ${badgeStyle}">${badgeLabel}</span>`;
}

function formatCurrency(value: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
}

function formatMonthYear(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("id-ID", {
    month: "long",
    year: "numeric",
  });
  return formattedDate;
}

export {
  formatNumber,
  invoiceStatus,
  invoiceStatusToBadge,
  formatMonthYear,
  formatCurrency,
};
