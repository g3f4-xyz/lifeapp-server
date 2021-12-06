import axios from 'axios';
import AuthContext from '../AuthContext';

export default class WebClient {
  constructor(
    private readonly host: string,
    private readonly authContext: AuthContext,
  ) {}

  async get<Data>(path: string) {
    const { data } = await axios.get<Data>(`${this.host}${path}`, {
      headers: { Authorization: this.authContext.token },
    });

    return data;
  }

  async post<Data, Body>(path: string, body: Body) {
    const { data } = await axios.post<Data>(`${this.host}${path}`, body, {
      headers: {
        Authorization: this.authContext.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return data;
  }

  async put<Data, Body>(path: string, body: Body) {
    const { data } = await axios.put<Data>(`${this.host}${path}`, body, {
      headers: { Authorization: this.authContext.token },
    });

    return data;
  }

  async delete<Data>(path: string) {
    const { data } = await axios.delete<Data>(`${this.host}${path}`, {
      headers: { Authorization: this.authContext.token },
    });

    return data;
  }
}
