

// const page = () => {

//      const isConnected = useHMSStore(selectIsConnectedToRoom);
//         const hmsActions = useHMSActions();
    
    
//         useEffect(() => {
//             window.onunload = () => {
//                 if (isConnected) {
//                     hmsActions.leave();
//                 }
//             };
//         }, [hmsActions, isConnected]);
    


//     return (
//       <div className="App">
//                   {isConnected ? (
//                       <>
//                           <Conference />
//                           <Footer />
//                       </>
//                   ) : (
//                       <JoinForm />
//                   )}
//               </div>
//     );
//   };
  
//   export default page;