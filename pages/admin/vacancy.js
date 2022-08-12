
import SideNavbar from '../../components/admin/SideNavbar'
import VacancyList from '../../components/admin/VacancyList';
import { AnimatePresence } from "framer-motion";
import { modalState, modalTypeState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import Modal from "../../components/Modal";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../util/mongodb";

function Vacancy({ jobs }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      // router.push("/");
    },
  });

  return (
    <div>
        <div className='flex'>
           <SideNavbar/>
           <VacancyList  jobs={jobs}/>
        </div>
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
    </div>
  )
}

export default Vacancy


export async function getServerSideProps(context) {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/src/user/login",
  //     },
  //   };
  // }
  
  const { db } = await connectToDatabase();
   const jobs = await db
     .collection("jobs")
     .find()
     .sort({ timestamp: -1 })
     .toArray();

  return {
    props: {
      session,
      jobs: jobs.map((job) => ({
        _id: job._id.toString(),
        jobid: job.jobid,
        position: job.position,
        availability: job.availability,
        status:job.status,
        miniDesc: job.miniDesc,
        // discripition: job.descripition,
        // username: job.username,
        // email: job.email,
        // userImg: job.userImg,
        // createdAt: job.createdAt,
      })),
    },
  };
}
