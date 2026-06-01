export interface AdminProps {
  uid: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  createdAt: Date;
  lastLogin: Date | null;
}

export class Admin {
  readonly uid: string;
  readonly email: string;
  readonly displayName: string;
  readonly isAdmin: boolean;
  readonly createdAt: Date;
  readonly lastLogin: Date | null;

  private constructor(props: AdminProps) {
    this.uid = props.uid;
    this.email = props.email;
    this.displayName = props.displayName;
    this.isAdmin = props.isAdmin;
    this.createdAt = props.createdAt;
    this.lastLogin = props.lastLogin;
  }

  static reconstruct(props: AdminProps): Admin {
    return new Admin(props);
  }

  recordLogin(): Admin {
    return new Admin({ ...this.toProps(), lastLogin: new Date() });
  }

  toProps(): AdminProps {
    return {
      uid: this.uid,
      email: this.email,
      displayName: this.displayName,
      isAdmin: this.isAdmin,
      createdAt: this.createdAt,
      lastLogin: this.lastLogin,
    };
  }
}
