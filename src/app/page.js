

export default function Home() {

  const loginStatus = [
    {
      'status': false
    }
  ]

  return (
    <>
      <div className="bg-indigo-600 bg-primary h-screen flex items-center justify-center px-6 py-4">
        {/* OUT OF LOCATION */}
        <div className="out-of-location text-center grid items-center justify-center gap-52">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="none" viewBox="0 0 120 120" className="mx-auto">
            <g clip-path="url(#a)" opacity=".1">
              <path fill="#fff" fill-rule="evenodd" d="M23.25 84a3.75 3.75 0 0 1 3-1.5H45a3.75 3.75 0 1 1 0 7.5H28.125L11.25 112.5h97.5L91.875 90H75a3.75 3.75 0 0 1 0-7.5h18.75a3.75 3.75 0 0 1 3 1.5l22.5 30a3.754 3.754 0 0 1 .354 3.927A3.743 3.743 0 0 1 116.25 120H3.75a3.751 3.751 0 0 1-3-6l22.5-30Z" clip-rule="evenodd" />
              <path fill="#fff" fill-rule="evenodd" d="M60 7.5a22.5 22.5 0 1 0 0 45 22.5 22.5 0 0 0 0-45ZM30 30a30 30 0 1 1 33.75 29.767v41.483a3.751 3.751 0 0 1-7.5 0V59.775A30 30 0 0 1 30 30Z" clip-rule="evenodd" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h120v120H0z" />
              </clipPath>
            </defs>
          </svg>

          <div className="grid gap-3 text-white">
            <h1 className="text-xl sm:text-2xl font-bold">നിങ്ങൾക്കു ലോഗിൻ ചെയ്യാൻ സാധിക്കുകയില്ല </h1>
            <p>നിങ്ങൾ ഇപ്പോൾ നില്കുന്നത് സ്ഥാപനത്തിന് പുറത്താണ് </p>
          </div>
        </div>
      </div>
    </>
  );
}
