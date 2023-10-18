// import {FC, useState} from "react";
//
// import { DrobDownMenuItemRadix, UniversalDropDawnMenu } from "@/components";
// import { AddNewCard } from "@/pages/cards";
// import { DeleteIcon } from "@/styles/assets/icons/delete-icon";
// import { LearnIcon } from "@/styles/assets/icons/learn-icon";
// import { PenIcon } from "@/styles/assets/icons/pen-icon";
// import { useModal } from "@/utils/hooks";
// import {EditCard} from "@/pages/cards/edit-card";
// type Props = {
//   card: any;
// };
// export const UserActionMenu: FC<Props> = ({ card }) => {
//   const { openModal } = useModal();
//   const [editOpen,setEditOpen]=useState(false)
// const handleOpen=()=>{
//     <EditCard card={} editOpen={} openMd={}/>
// }
//   return (
//     <>
//       <UniversalDropDawnMenu
//         variant={"withTooltip"}
//         isTooltip={true}
//         isAvatar={false}
//       >
//         <DrobDownMenuItemRadix
//           icon={<LearnIcon />}
//           text={`Learn`}
//           onSelect={() => {}}
//         ></DrobDownMenuItemRadix>
//         <DrobDownMenuItemRadix
//           icon={<PenIcon />}
//           text={"Edit"}
//           onSelect={handleOpen}
//         ></DrobDownMenuItemRadix>
//         <DrobDownMenuItemRadix
//           icon={<DeleteIcon />}
//           text={`Delete`}
//           onSelect={() => {}}
//         ></DrobDownMenuItemRadix>
//       </UniversalDropDawnMenu>
//     </>
//   );
// };
