<Paper variant="outlined" square elevation={0}  width={30}>
          <header className="App-header">

            <Typography variant="h5" align="center">RUTs Chilenos</Typography>
            <ul>

              {/*this.state.rutsArray.map((currentValue, index, array) =>
                  <li><span>{currentValue}</span><button onClick={() => {navigator.clipboard.writeText(currentValue)}}>Copiar</button><span><Button color="primary" variant="outlined" >Copiar</Button></span></li>
            )*/}

            </ul>
          </header>
          <div style={{ height: 700 , width:550}}>
            <DataGrid
              rows={newRows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              disableColumnMenu={true}
              rowsPerPageOptions={[2, 5, 10]}
            />
          </div>
        </Paper>


        