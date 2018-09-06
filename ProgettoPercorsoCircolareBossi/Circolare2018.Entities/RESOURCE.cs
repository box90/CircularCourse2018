//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Circolare2018.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class RESOURCE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public RESOURCE()
        {
            this.COURSE = new HashSet<COURSE>();
            this.SUBSCRIPTION = new HashSet<SUBSCRIPTION>();
            this.SUBSCRIPTION1 = new HashSet<SUBSCRIPTION>();
            this.TEACHING = new HashSet<TEACHING>();
        }
    
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Nullable<bool> IsAvaiable { get; set; }
        public Nullable<bool> IsCP { get; set; }
        public Nullable<bool> IsTeacher { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<COURSE> COURSE { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SUBSCRIPTION> SUBSCRIPTION { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SUBSCRIPTION> SUBSCRIPTION1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TEACHING> TEACHING { get; set; }
    }
}
