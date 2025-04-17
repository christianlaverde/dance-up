export interface AddressOptions {
  addr1?: string;
  addr2?: string;
  city?: string;
  state?: string;
  zip?: string;
}

// Type Guard
export function isAddressVO(value: any): value is AddressVO {
  return value instanceof AddressVO;
}

export class AddressVO {
  private readonly addr1: string;
  private readonly addr2: string;
  private readonly city: string;
  private readonly state: string;
  private readonly zip: string;

  private validateField(value: unknown, fieldName: string): string {
    if (value === undefined || value === null) {
      return '';
    }
    
    if (typeof value !== 'string') {
      throw new Error(`Address ${fieldName} must be a string, received ${typeof value}`);
    }
    
    return value;
  }

  constructor(props: AddressOptions) {
    this.addr1 = this.validateField(props.addr1, 'addr1');
    this.addr2 = this.validateField(props.addr1, 'addr2');
    this.city = this.validateField(props.addr1, 'city');
    this.state = this.validateField(props.addr1, 'state');
    this.zip = this.validateField(props.addr1, 'zip');
  }

  getAddr1() {
    return this.addr1;
  }

  getAddr2() {
    return this.addr2;
  }

  getCity() {
    return this.city;
  }

  getState() {
    return this.state;
  }

  getZip() {
    return this.zip;
  }
}