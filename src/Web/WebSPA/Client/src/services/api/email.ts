import Axios from 'axios'
import appSettings from 'src/config';

export async function create(dto: { emails: string[]}): Promise<{message: string}> {
   const response = await Axios.post<{message: string}>(`${appSettings.identityUrl}/api/v1/emails/`, dto);
   return response.data;
}