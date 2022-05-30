using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Safra
{
    public class Credits
    {
        public int Id { get; set; }
        public List<TypesOfCredits> typesOfCredits { get; set; }
        public List<PersonType> personTypes { get; set; }
        public int QuantityInstallments { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool CreditStatus { get; set; }
        public decimal TotalAmountWithInterest { get; set; }
        public decimal InterestAmount { get; set; }
    }
}
