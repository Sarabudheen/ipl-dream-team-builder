export interface IplTeam {
  name: string;
  abbr: string;
  short: string;
  color: string;
  textColor: string;
  logo: string;
}

export const TEAMS: IplTeam[] = [
  { name: 'Mumbai Indians',        abbr: 'MI',   short: 'Mumbai',    color: '#005DA0', textColor: '#fff', logo: 'https://via.placeholder.com/80/005DA0/FFFFFF?text=MI' },
  { name: 'Chennai Super Kings',   abbr: 'CSK',  short: 'Chennai',   color: '#F9CD05', textColor: '#1A1A2E', logo: 'https://via.placeholder.com/80/F9CD05/1A1A2E?text=CSK' },
  { name: 'Royal Challengers Bengaluru',     abbr: 'RCB',  short: 'Bangalore', color: '#C8102E', textColor: '#fff', logo: 'https://via.placeholder.com/80/C8102E/FFFFFF?text=RCB' },
  { name: 'Kolkata Knight Riders', abbr: 'KKR',  short: 'Kolkata',   color: '#3A225D', textColor: '#FFD700', logo: 'https://via.placeholder.com/80/3A225D/FFD700?text=KKR' },
  { name: 'Delhi Capitals',        abbr: 'DC',   short: 'Delhi',     color: '#0078BC', textColor: '#fff', logo: 'https://via.placeholder.com/80/0078BC/FFFFFF?text=DC' },
  { name: 'Rajasthan Royals',      abbr: 'RR',   short: 'Rajasthan', color: '#EA1A85', textColor: '#fff', logo: 'https://via.placeholder.com/80/EA1A85/FFFFFF?text=RR' },
  { name: 'Sunrisers Hyderabad',   abbr: 'SRH',  short: 'Hyderabad', color: '#F26522', textColor: '#fff', logo: 'https://via.placeholder.com/80/F26522/FFFFFF?text=SRH' },
  { name: 'Punjab Kings',          abbr: 'PBKS', short: 'Punjab',    color: '#D71920', textColor: '#fff', logo: 'https://via.placeholder.com/80/D71920/FFFFFF?text=PBKS' },
  { name: 'Gujarat Titans',        abbr: 'GT',   short: 'Gujarat',   color: '#1B2133', textColor: '#C19A30', logo: 'https://via.placeholder.com/80/1B2133/C19A30?text=GT' },
  { name: 'Lucknow SuperGiants',   abbr: 'LSG',  short: 'Lucknow',   color: '#A72B2A', textColor: '#ACDDE7', logo: 'https://via.placeholder.com/80/A72B2A/ACDDE7?text=LSG' },
];