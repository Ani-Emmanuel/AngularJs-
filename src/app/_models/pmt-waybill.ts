export class PmtWaybill {
  id: string;
  transaction_code: string;
  terminal_id: string;
  driver_id: string;
  vehicle_id: string;
  pmt_schedule_id: string;
  pmt_route_id: string;
  fare_total: number;
  fuel_amount: number;
  driver_allowance: number;
  is_dto: boolean;
  dto_maintenance: number;
  dto_repayment: number;
  dto_service_chcharge: number;
  departure_date: string;
  authorized_by: string;
  authorized_date: string;
  boarding_status: string;
}
